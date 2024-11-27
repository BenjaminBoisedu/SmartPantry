import React, { useState, useEffect } from "react";
import "./RecipeProposition.css";
import axios from "axios";
export default function RecipeProposition() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const FilterRecettes = async (régime, temps) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&diet=${régime}&maxReadyTime=${temps}&type=${type}`
      );
      setRecipes(response.data.results);
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  const Régime = [
    "Sans gluten",
    "Cétogène",
    "Végétarien",
    "Lacto-Végétarien",
    "Ovo-végétarien",
    "Végétalien",
    "Pescétarien",
    "Paléo",
    "Primitif",
    "Faible teneur en FODMAP",
    "Whole30",
  ];

  const type = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];

  const Temps = ["15", "30", "45", "60", "90"];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiKey = "e03a2510845c466895de10d89e3c77de";
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
      <div className="ContainerFiltres">
        <form action="" method="" id="Filtre">
          <div className="Filtres">
            <div className="Filtre">
              <label htmlFor="Regime">
                Régime:
                <select name="Regime" id="Regime">
                  {Régime.map((régime) => (
                    <option value={régime} key={régime}>
                      {régime}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="Filtre">
              <label htmlFor="Type">
                Type:
                <select name="Type" id="Type">
                  {type.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="Filtre">
              <label htmlFor="Temps">
                Temps:
                <select name="Temps" id="Temps">
                  {Temps.map((temps) => (
                    <option value={temps} key={temps}>
                      {temps}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <button type="submit" onClick={FilterRecettes}>
            Filtrer
          </button>
        </form>
      </div>
      <div id="containeurRecette">
        {loading ? (
          <p>Chargement des recettes...</p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <a
              className="recette"
              key={recipe.id}
              href={`/recipePage/${recipe.id}`}
            >
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
