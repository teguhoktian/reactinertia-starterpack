<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LogActivity extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            'status' => 'success',
            'data' => $this->collection,
            'filters' => request()->all(['search', 'perpage', 'field', 'direction'])
        ];
    }
}
