import React, { useState, useEffect } from "react";
import ProfileOption from "./profileOptions/profileOption";
import profilImg from "../Profil/IMG/profil.png";

export default function Profil() {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("Name") || "Prénom NOM DE FAMILLE";

    setName(storedName);
  }, []);

  return (
    <>
      <div className="profil">
        <div className="containerProfil">
          <div className="profilTitle">Profil</div>
          <div className="userPhotos">
            <img
              src={profilImg}
              alt="Profil"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="userInfo">
            <h1>{name}</h1>
          </div>
        </div>
        <div className="UserOptions">
          <ProfileOption />
        </div>
      </div>
    </>
  );
}
