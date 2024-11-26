import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = "c9d232ec6e0d41248085ac54fb3eac3d";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la recette :",
          error
        );
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

  return (
    <div className="recipe-details">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h1>{recipe.title}</h1>
      <button className="calories-button">
        {recipe.nutrition?.calories || "N/A"} Calories
      </button>

      <div className="icons">
        <span>🍴 {recipe.servings} portions</span>
        <span>⏱ {recipe.readyInMinutes} minutes</span>
        <span>{recipe.vegetarian ? "🌱 Végétarien" : "🍖 Non Végétarien"}</span>
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
            <p>
              {ingredient.amount} {ingredient.unit}
            </p>
          </div>
        ))}
      </div>

      <button className="take-recipe-button">Prendre cette recette</button>
    </div>
  );
}
