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
                'email' => 'required'
            ]);

        $user = User::where('email', $request->input('email'))->first();
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
            $produits = Produit::create([
                'Name' => $request->input('Name'),
                'quantity' => $request->input('quantity'),
                'Unit' => $request->input('unit'),
            ]);
            $produits->users()->attach($user);
            return response()->json($produits, 200);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Produit $produits)
    {
        $validated = $request->validate([
            'quantity' => 'required | integer',
            "addedDate" => 'required | date',
            'expirationDate' => 'required | date',
        ]);

        $produits->update([
            'quantity' => $request->input('quantity'),
            'addedDate' => $request->input('addedDate'),
            'expirationDate' => $request->input('expirationDate'),
        ]);

        return response()->json($produits, 200);
    }

    public function destroy(Produit $produits)
    {
        $produits->delete();
        return response()->json(null, 204);
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
}
