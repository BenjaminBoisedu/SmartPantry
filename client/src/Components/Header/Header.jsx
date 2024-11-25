import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Navbar from "../Nav/Navbar";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1>SmartPantry</h1>
      </Link>
      <Navbar />
    </header>
  );
}
