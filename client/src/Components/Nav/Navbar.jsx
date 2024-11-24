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
              <Link to="/ajout_ingredients">Ajouter Ingredients</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
