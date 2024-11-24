import React from "react";
import axios from "axios";
import "../CSS/Profil.CSS";
import { useState, useEffect } from "react";

export default function ProfileOption() {
  const [ShowUpdate, setShowUpdate] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  const deleteAccount = () => {
    axios
      .delete("http://localhost:8000/api/user/delete", {
        headers: {
          Authorization: `${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => {
        alert("Compte supprimé !");
        logout();
      })
      .catch((err) => console.error(err));
  };

  const UpdatePassword = () => {
    axios
      .put("http://localhost:8000/api/user/updatePassword", {
        headers: {
          Authorization: `${localStorage.getItem("access_token")}`,
        },
        oldPassword: localStorage.getItem("password"),
        password: document.getElementById("NewPassword").value,
        email: localStorage.getItem("email"),
      })
      .then(() => {
        alert("Mot de passe modifié !");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="optionContainer">
      <div>
        <span>Se déconnecter</span>
        <button onClick={logout}>Quitter</button>
      </div>
      <div>
        <span>Supprimer le compte</span>
        <button onClick={deleteAccount}>Supprimer</button>
      </div>
      <div>
        <span>Changer mot de passe</span>
        <button onClick={() => setShowUpdate(!ShowUpdate)}>Modifier</button>
        {ShowUpdate && (
          <div className="updatePassword">
            <form action="" method="post" className="UpdatePasswordForm">
              <label htmlFor="OldPassword">
                Ancien mot de passe:
                <input type="password" id="OldPassword" autoComplete="Off" />
              </label>
              <label htmlFor="NewPassword">
                Nouveau mot de passe:
                <input type="password" id="NewPassword" autoComplete="Off" />
              </label>
              <button onClick={UpdatePassword}>Valider</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
