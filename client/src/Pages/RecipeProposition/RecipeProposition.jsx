import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeProposition.css";

export default function RecipeProposition() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredientIds, setIngredientIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // État pour la barre de recherche

  const FilterRecettes = async (régime, temps, type) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${régime}&maxReadyTime=${temps}&type=${type}`
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
        console.error(
          "Erreur lors de la récupération des ingrédients :",
          error.response?.data || error.message
        );
      }
    };

    fetchUserIngredients();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      alert("Veuillez entrer un terme de recherche.");
      return;
    }

    setLoading(true);
    try {
      const apiKey = "e03a2510845c466895de10d89e3c77de";
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${apiKey}&number=100&ignorePantry=true`;

      const response = await axios.get(url);
      const data = response.data.results; // Récupère les résultats
      setRecipes(data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredientIds.length === 0) return;
      try {
        console.log("ok");
        const apiKey = "5dc8d2c0a9fd46a18c4d2e37d838af35";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientIds.join(
            ","
          )}&number=100&ignorePantry=true&ranking=2&apiKey=${apiKey}&min-missing-ingredients=0`
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
      <div id="searchBarRecipe">
        <input
          type="text"
          placeholder="Entrer le nom de la recette :"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
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
          <button type="submit" id="buttonFiltre" onClick={FilterRecettes}>
            Filtrer
          </button>
        </form>
      </div>
      <div id="containeurRecette">
        {loading ? (
          <p className="infoPasDeRecette">Chargement des recettes...</p>
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
                <p>{recipe.title}</p>
              </div>
            </a>
          ))
        ) : (
          <p className="infoPasDeRecette">Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
}
