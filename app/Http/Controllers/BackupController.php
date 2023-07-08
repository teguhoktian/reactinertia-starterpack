<?php

namespace App\Http\Controllers;

use App\Jobs\CreateBackupJob;
use App\Rules\PathToZip;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Backup\BackupDestination\Backup;
use Spatie\Backup\BackupDestination\BackupDestination;
use Spatie\Backup\Helpers\Format;
use Spatie\Backup\Tasks\Monitor\BackupDestinationStatus;
use Spatie\Backup\Tasks\Monitor\BackupDestinationStatusFactory;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupController extends Controller
{
    public $backupStatuses = [];
    public $activeDisk = null;
    public $disks = [];
    public $files = [];
    public $deletingFile = null;
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $this->backupStatuses = Cache::remember('backup-statuses', now()->addSeconds(4), function () {
            return BackupDestinationStatusFactory::createForMonitorConfig(config('backup.monitor_backups'))->map(function (BackupDestinationStatus $backupDestinationStatus) {
                return [
                    'name' => $backupDestinationStatus->backupDestination()->backupName(),
                    'disk' => $backupDestinationStatus->backupDestination()->diskName(),
                    'reachable' => $backupDestinationStatus->backupDestination()->isReachable(),
                    'healthy' => $backupDestinationStatus->isHealthy(),
                    'amount' => $backupDestinationStatus->backupDestination()->backups()->count(),
                    'newest' => $backupDestinationStatus->backupDestination()->newestBackup()
                        ? $backupDestinationStatus->backupDestination()->newestBackup()->date()->diffForHumans()
                        : 'No backups present',
                    'usedStorage' => Format::humanReadableSize($backupDestinationStatus->backupDestination()->usedStorage()),
                ];
            })
                ->values()
                ->toArray();
        });

        if (!$this->activeDisk and count($this->backupStatuses)) {
            $this->activeDisk = $this->backupStatuses[0]['disk'];
        }

        $this->disks = collect($this->backupStatuses)
            ->map(function ($backupStatus) {
                return $backupStatus['disk'];
            })
            ->values()
            ->all();

        $this->files = $this->getFiles($request->disk);

        return Inertia::render('Settings/Backup/BackupIndex', [
            'backupStatuses' => $this->backupStatuses,
            'disks' => $this->disks,
            'activeDisk' => $request->disk ?: $this->activeDisk,
            'files' => $this->files
        ]);
    }

    public function getFiles($disk = null)
    {
        if ($disk) {
            $this->activeDisk = $disk;
        }

        $backupDestination = BackupDestination::create($this->activeDisk, config('backup.backup.name'));

        return $backupDestination
            ->backups()
            ->map(function (Backup $backup) {
                $size = method_exists($backup, 'sizeInBytes') ? $backup->sizeInBytes() : $backup->size();

                return [
                    'path' => $backup->path(),
                    'date' => $backup->date()->format('Y-m-d H:i:s'),
                    'size' => Format::humanReadableSize($size),
                ];
            })
            ->toArray();
    }

    public function deleteFile(Request $request)
    {
        $this->files = $this->getFiles($request->disk);

        $deletingFile = $this->files[$request->index_file];;

        $this->validateFilePath($deletingFile ? $deletingFile['path'] : '');

        $backupDestination = BackupDestination::create($this->activeDisk, config('backup.backup.name'));

        $backupDestination
            ->backups()
            ->first(function (Backup $backup) use ($deletingFile) {
                return $backup->path() === $deletingFile['path'];
            })
            ->delete();

        return redirect()->back()->with('message', __('File cadangan telah berhasil dihapus.'));
    }

    protected function validateFilePath(string $filePath)
    {
        try {
            Validator::make(
                ['file' => $filePath],
                [
                    'file' => ['required', new PathToZip],
                ],
                [
                    'file.required' => 'Select a file',
                ]
            )->validate();
        } catch (ValidationException $e) {
            $message = $e->validator->errors()->get('file')[0];
            return redirect()->back()->with('message', $message);
        }
    }

    public function createBackup(Request $request)
    {
        dispatch(new CreateBackupJob($request->option));
        return redirect()->back()->with('message', __("Pencadangan sendag diproses. Silahkan refresh untuk melihat hasil."));
    }

    public function downloadBackup(Request $request)
    {
        $this->validateFilePath($request->path);

        $backupDestination = BackupDestination::create($request->disk, config('backup.backup.name'));

        $backup = $backupDestination->backups()->first(function (Backup $backup) use ($request) {
            return $backup->path() === $request->path;
        });

        if (!$backup) {
            return response('Backup not found', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return $this->respondWithBackupStream($backup);
    }

    public function respondWithBackupStream(Backup $backup): StreamedResponse
    {
        $fileName = pathinfo($backup->path(), PATHINFO_BASENAME);
        $size = method_exists($backup, 'sizeInBytes') ? $backup->sizeInBytes() : $backup->size();

        $downloadHeaders = [
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Content-Type' => 'application/zip',
            'Content-Length' => $size,
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            'Pragma' => 'public',
        ];

        return response()->stream(function () use ($backup) {
            $stream = $backup->stream();

            fpassthru($stream);

            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, $downloadHeaders);
    }
}
