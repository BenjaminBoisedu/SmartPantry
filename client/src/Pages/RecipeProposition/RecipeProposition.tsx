import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeProposition.css";

export default function RecipeProposition() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredientIds, setIngredientIds] = useState([]);

  useEffect(() => {
    // Étape 1 : Récupérer les ingrédients de l'utilisateur depuis l'API locale
    const fetchUserIngredients = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/products-by-email",
          { email: localStorage.getItem("email") }
        );
        const ingredientList = response.data;
        const ids = ingredientList.map((ingredient) => ingredient.Name); // Extraire uniquement les IDs
        console.log(ids);
        setIngredientIds(ids);
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error.response?.data || error.message);
      }
    };

    fetchUserIngredients();
  }, []);

  useEffect(() => {
    // Étape 2 : Une fois les IDs récupérés, appeler l'API Spoonacular
    const fetchRecipes = async () => {
      if (ingredientIds.length === 0) return; // Ne pas exécuter si les IDs ne sont pas disponibles
      try {
        console.log("ok");
        const apiKey = "3163dac8e6e84c68be7f82233d5c77ca";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientIds.join(",")}&number=100&ignorePantry=true&ranking=2&apiKey=${apiKey}&min-missing-ingredients=0`
        );        
        console.log(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientIds.join(",")}&number=100&apiKey=${apiKey}`)
        const data = await response.json();
        setRecipes(data); // Spoonacular retourne directement un tableau
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredientIds]); // Appeler cette fonction uniquement lorsque les IDs changent

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
                <h4>{recipe.title}</h4>
                <p>{recipe.readyInMinutes} min</p>
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
