import React, { useState, useEffect } from "react";
import "./RecipeProposition.css";

export default function RecipeProposition() {
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiKey = "c9d232ec6e0d41248085ac54fb3eac3d"; 
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=100&apiKey=${apiKey}`
        );
        const data = await response.json();
        setRecipes(data.recipes); 
        setLoading(false); 
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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
