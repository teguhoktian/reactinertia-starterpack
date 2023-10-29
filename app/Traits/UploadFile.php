<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait UploadFile
{
    public function uploadFile(UploadedFile $file, $folder = null, $disk = 'public', $filename = null)
    {
        $FileName = !is_null($filename) ? $filename : Str::random(10);
        return $file->storeAs(
            $folder,
            $FileName . "." . $file->getClientOriginalExtension(),
            $disk
        );
    }


    public function deleteFile($path, $disk = 'public')
    {
        if (!is_null($path) && Storage::disk($disk)->exists($path)) Storage::disk($disk)->delete($path);
    }
}
