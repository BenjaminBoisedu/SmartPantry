import React from "react";

export default function Filtres() {
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

  return (
    <div className="ContainerFiltres">
      <form action="" method="post">
        <div className="Filtres">
          <div className="Filtre">
            <label htmlFor="Difficulté">
              Difficulté:
              <select name="Difficulté" id="Difficulté">
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>
            </label>
          </div>
          <div className="Filtre">
            <label htmlFor="Temps">
              Régime:
              <select name="Temps" id="Temps">
                {Régime.map((régime) => (
                  <option value={régime}>{régime}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="Filtre">
            <label htmlFor="Temps">
              Temps:
              <select name="Temps" id="Temps">
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="90">90</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit">Filtrer</button>
      </form>
    </div>
  );
}
