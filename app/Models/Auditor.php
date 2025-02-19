<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auditor extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'department',
        'contactNumber',
    ];
}
