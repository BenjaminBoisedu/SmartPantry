import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeProposition.css";

export default function RecipeProposition() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredientIds, setIngredientIds] = useState([]);

  useEffect(() => {
    const fetchUserIngredients = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/products-by-email",
          { email: localStorage.getItem("email") }
        );
        const ingredientList = response.data;
        const ids = ingredientList.map((ingredient) => ingredient.Name); 
        console.log(ids);
        setIngredientIds(ids);
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error.response?.data || error.message);
      }
    };

    fetchUserIngredients();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredientIds.length === 0) return; 
      try {
        console.log("ok");
        const apiKey = "3163dac8e6e84c68be7f82233d5c77ca";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientIds.join(",")}&number=100&ignorePantry=true&ranking=2&apiKey=${apiKey}&min-missing-ingredients=0`
        );        
        const data = await response.json();
        setRecipes(data); 
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredientIds]); 

  return (
    <div id="PageProposition">
      <h1>Proposition de recettes</h1>
      <input
        id="inputRechercheRecettes"
        type="text"
        placeholder="Entrer le nom de la recette :"
      />
      <div id="containeurRecette">
        {loading ? (
          <p>Chargement des recettes...</p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <a className="recette" key={recipe.id} href={`/recipePage/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                onError={(e) => (e.target.src = "path/to/default-image.png")}
              />
              <div className="info">
                <p>{recipe.title}</p>
              </div>
            </a>
          ))
        ) : (
          <p>Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
}
