<?php

// app/Models/Employee.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    use HasFactory;

    // Menentukan nama tabel jika tidak sesuai dengan penamaan konvensi Laravel
    protected $table = 'employees';

    // Menentukan kolom-kolom yang dapat diisi secara massal
    protected $fillable = [
        'id',
        'image',
        'name',
        'phone',
        'division_id',
        'position',
    ];

    // // Menentukan kolom-kolom yang merupakan UUID
    // protected $keyType = 'string';

    // // Menentukan bahwa kolom ID bukan auto increment
    // public $incrementing = false;

    /**
     * Relasi dengan model Division
     * @return BelongsTo
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}

