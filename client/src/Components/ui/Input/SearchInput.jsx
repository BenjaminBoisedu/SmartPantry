import React from "react";
import { useState } from "react";

export default function SearchInput() {
  const [Name, setName] = useState("");
  return (
    <div className="InputContainer">
      <label htmlFor="Search"></label>
      <input
        type="text"
        id="Name"
        className="input"
        placeholder="Entrer le nom de la recette : "
        name="Name"
        autoComplete="on"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
