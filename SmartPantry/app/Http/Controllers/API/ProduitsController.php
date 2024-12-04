<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Support\Facades\Storage;



class ProduitsController extends Controller
{
    public function index()
    {
        return response()->json(Produit::all(), 200);
    }

    public function show($id)
    {
        $produits = Produit::find($id);
        return response()->json($produits, 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'Name' => 'required|unique:produits',
                'quantity' => 'required|numeric',
                'unit' => 'required|string',
                'email' => 'required',
                'id_produit_api' => 'string',
                'imageProduit'=>'string'
            ]);

        $user = User::where('email', $request->input('email'))->first();
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
            $produits = Produit::create([
                'Name' => $request->input('Name'),
                'quantity' => $request->input('quantity'),
                'Unit' => $request->input('unit'),
                'id_produit_api' => $request->input('id_produit_api'),
                'imageProduit' => $request->input('imageProduit')
            ]);

            info('Product created:', $produits->toArray());
            
            $produits->users()->attach($user);
            return response()->json($produits, 200);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $produits = Produit::find($id);
        if (!$produits) {
            return response()->json([
                'message' => 'Produit introuvable.',
            ], 404);
        }
        $validated = $request->validate([
            'quantity' => 'required | integer',
        ]);

        $produits->update([
            'quantity' => $request->input('quantity'),
        ]);

        try {
            $produits->update([
                'Quantity' => $validated['quantity'],
            ]);
    
            return response()->json([
                'message' => 'Produit mis à jour avec succès.',
                'produit' => $produits,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du produit.',
                'error' => $e->getMessage(),
            ], 500);
    }
}

    public function destroy(Produit $produit)
    {
        if (!$produit) {
            return response()->json(['error' => 'Produit not found'], 404);
        }
    
        try {
            $produit->users()->detach();
            $produit->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete produit', 'message' => $e->getMessage()], 500);
        }
    }

    public function search($name)
    {
        return response()->json(Produit::where('Name', 'like', '%' . $name . '%')->get(), 200);
    }

    public function getProductsByEmail(Request $request)
{
    try {
        
        $user = User::where('email', $request->input('email'))->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $products = $user->produits;

        return response()->json($products, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
    }
}
public function takeRecipe(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|email',
        'id' => 'required',
        'stockChange' => 'required|integer',
    ]);

    $user = User::where('email', $validatedData['email'])->first();

    if (!$user) {
        return response()->json(['error' => 'Utilisateur introuvable avec cet email.'], 404);
    }

    $produit = Produit::where('id_produit_api', $validatedData['id'])->first();

    if (!$produit) {
        return response()->json(['error' => "Produit introuvable pour id_produit_api : {$validatedData['id']}"], 404);
    }

    $nouveauStock = $produit->Quantity + $validatedData['stockChange'];

    if ($nouveauStock < 0) {
        return response()->json(['error' => "Stock insuffisant pour le produit : {$produit->Name}. Stock actuel : {$produit->Quantity}"], 400);
    }

    try {
        $produit->update(['quantity' => $nouveauStock]);
        return response()->json(['success' => "Stock mis à jour pour le produit : {$produit->Name}. Nouveau stock : {$nouveauStock}"], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => "Erreur lors de la mise à jour du produit : {$produit->Name}. Détails : {$e->getMessage()}"], 500);
    }
}
}
