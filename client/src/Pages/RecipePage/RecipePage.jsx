import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import axios from "axios";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = "5dc8d2c0a9fd46a18c4d2e37d838af35";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la recette :", error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!recipe) {
    return <p>Aucune recette trouvée.</p>;
  }

  const takeRecipe = async () => {
    try {
      // Parcourez chaque ingrédient et envoyez une requête pour mettre à jour le stock
      for (const ingredient of recipe.extendedIngredients) {
        const payload = {
          stock: -ingredient.amount, // Décrémente le stock par la quantité requise
        };
  
        // Faites une requête PUT ou PATCH pour mettre à jour le stock du produit
        await axios.patch(
          `http://localhost:8000/api/produits/${ingredient.id}`,
          payload
        );
      }
  
      alert("Les ingrédients ont été retirés avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du stock :", error.response?.data || error.message);
      alert("Une erreur s'est produite lors de la mise à jour des ingrédients.");
    }
  };
  

  return (
    <div className="recipe-details">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h1>{recipe.title}</h1>
      <button className="calories-button">{recipe.nutrition?.calories || "N/A"} Calories</button>
      
      <div className="icons">
        <div className="infoRecipe"><span>🍴</span>{recipe.servings} portions</div>
        <div className="infoRecipe"><span>⏱ </span>{recipe.readyInMinutes} minutes</div>
        <div className="infoRecipe"><span>{recipe.vegetarian ? "🌱" : "🍖"}</span>{recipe.vegetarian ? "Végétarien" : "Non Végétarien"}</div>
      </div>
    <div id="barSeparation"></div>
      <h2>Les ingrédients</h2>
      <p id="nombrePersonne">Nombre de personnes : {recipe.servings}</p>
      <div className="ingredients-list">
        {recipe.extendedIngredients.map((ingredient) => (
          <div key={ingredient.id} className="ingredient-card">
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              alt={ingredient.name}
            />
            <p>{ingredient.name}</p>
            <p>{ingredient.amount} {ingredient.unit}</p>
          </div>
        ))}
      </div>

      <button className="take-recipe-button" onClick={takeRecipe}>Prendre cette recette</button>
    </div>
  );
}
