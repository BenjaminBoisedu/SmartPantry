import React from "react";
import axios from "axios";
import "./Filtres.css";
import { useState, useEffect } from "react";

export default function Filtres() {
  const API_KEY = "c9c6579ba7f24849bee095c326cfe70d";

  const [FilteredRecettes, setFilteredRecettes] = useState([]);

  const FilterRecettes = async (régime, difficulté, temps) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&diet=${régime}&maxReadyTime=${temps}`
      );
      setFilteredRecettes(response.data.results);
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

  const Temps = ["15", "30", "45", "60", "90"];

  const Difficulté = ["Facile", "Moyen", "Difficile"];

  return (
    <div className="ContainerFiltres">
      <form action="" method="post" id="Filtre">
        <div className="Filtres">
          <div className="Filtre">
            <label htmlFor="Difficulté">
              Difficulté:
              <select name="Difficulté" id="Difficulté">
                {Difficulté.map((difficulté) => (
                  <option value={difficulté} key={difficulté}>
                    {difficulté}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="Filtre">
            <label htmlFor="Temps">
              Régime:
              <select name="Temps" id="Temps">
                {Régime.map((régime) => (
                  <option value={régime} key={régime}>
                    {régime}
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
  );
}
