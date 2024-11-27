<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produits';
    protected $primaryKey = 'id';
    protected $guarded = [];

    protected $fillable = [
        'Name',
        'quantity',
        'Unit',
    ];

    public function category()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'produit_user', 'produit_id', 'user_id');
    }
}