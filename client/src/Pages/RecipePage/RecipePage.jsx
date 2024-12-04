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
        const apiKey = "c364ddb963a5427cbcdaa07617dfee49";
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
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <p>No recipe found.</p>;
  }

  const takeRecipe = async () => {
  try {
    const missingIngredients = [];

    for (const ingredient of recipe.extendedIngredients) {
      console.log("ID de l'ingrédient :", ingredient.id); // Debug
      console.log("Quantité nécessaire :", ingredient.amount); // Debug

      // Envoi au backend pour soustraire `ingredient.amount` de la quantité en stock
      const response = await fetch(`http://localhost:8000/api/produits/takeRecipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ingredient.id, // `id_produit_api` dans la base de données
          stockChange: -ingredient.amount, // Réduire le stock par la quantité nécessaire
          email: localStorage.getItem("email")
        }),
      });

      // Vérifier la réponse du backend
      if (!response.ok) {
        const result = await response.json();
        if (result.message === "Produit introuvable" || result.message === "Stock insuffisant") {
          missingIngredients.push(ingredient.name);
        }
      }
    }

    if (missingIngredients.length > 0) {
      alert(
        `You don't have enough of the following ingredients for this recipe: {missingIngredients}: ${missingIngredients.join(
          ", "
        )}`
      );
    } else {
      alert("Recipe successfully taken!");
    }
  } catch (error) {
    console.error("Erreur lors de la prise de la recette:", error);
  }
};

  
  
  
  

  return (
    <div className="recipe-details">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h1>{recipe.title}</h1>
      <button className="calories-button">{recipe.nutrition?.calories || "N/A"} Calories</button>
      
      <div className="icons">
        <div className="infoRecipe"><span>🍴</span>{recipe.servings} servings</div>
        <div className="infoRecipe"><span>⏱ </span>{recipe.readyInMinutes} minutes</div>
        <div className="infoRecipe"><span>{recipe.vegetarian ? "🌱" : "🍖"}</span>{recipe.vegetarian ? "Vegetarian" : "No Vegetarian"}</div>
      </div>
    <div id="barSeparation"></div>
      <h2>Ingredients</h2>
      <p id="nombrePersonne">Number of servings : {recipe.servings}</p>
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

      <button className="take-recipe-button" onClick={takeRecipe}>Take this recipe</button>
      <a className="take-recipe-button" href={recipe.sourceUrl}>View the recette</a>
    </div>
  );
}
