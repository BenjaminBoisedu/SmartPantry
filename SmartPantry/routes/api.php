<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoriesController;
use App\Http\Controllers\API\ProduitsController;
use App\Http\Controllers\AuthController;


Route::apiResource('categories', CategoriesController::class);
Route::get('categories/{categorie}/produits', [CategoriesController::class, 'GetCategorieProduits']);
Route::apiResource('produits', ProduitsController::class);
Route::post('/user/products-by-email', [ProduitsController::class, 'getProductsByEmail']);
Route::delete('/produits/{produit}', [ProduitsController::class, 'destroy']);
Route::post('/produits/takeRecipe', [ProduitsController::class, 'takeRecipe']);


// Login route
Route::post('login', [AuthController::class, 'login']);
// Register route
Route::post('register', [AuthController::class, 'register']);

// Update password route

Route::post('logout', [AuthController::class, 'logout']);
Route::delete('user/delete', [AuthController::class, 'delete']);
Route::post('user/updatePassword', [AuthController::class, 'UpdatePassword']);
