<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produit;
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
            ]);
    
            $produits = Produit::create([
                'Name' => $request->input('Name'),
                'quantity' => $request->input('quantity'),
                'Unit' => $request->input('unit'),
            ]);
            $userId = 1 ;
            $produits->users()->attach($userId);
            return response()->json($produits, 201);
    
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
}
