<?php

// app/Models/Division.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model
{
    use HasFactory;

    // Menentukan nama tabel jika tidak sesuai dengan penamaan konvensi Laravel
    protected $table = 'divisions';

    // Menentukan kolom-kolom yang dapat diisi secara massal
    protected $fillable = [
        'id',
        'name',
    ];

    // Menentukan kolom-kolom yang merupakan UUID
    protected $keyType = 'string';

    // Menentukan bahwa kolom ID bukan auto increment
    public $incrementing = false;

    /**
     * Relasi dengan model Employee
     * @return HasMany
     */
    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'division_id', 'id');
    }
}

