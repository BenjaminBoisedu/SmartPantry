import React from "react";
import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const accessToken = localStorage.getItem("access_token");

  return (
    <div>
      <ul className="Nav">
        {!accessToken ? (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/ajout_ingredients">Garde Manger</Link>
            </li>
            <li>
              <Link to="/recipeProposition">Idées de Recettes</Link>
            </li>
            <li className="profilLinks">
              <Link to="/profil">Mon Compte</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
