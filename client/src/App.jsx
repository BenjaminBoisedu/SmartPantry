import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Nav from "./Components/Nav/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profil from "./Pages/Profil/Profil";
import RecipePage from "./Pages/RecipePage/RecipePage";
import RecipeProposition from "./Pages/RecipeProposition/RecipeProposition";
import Mypantry from "./Pages/Mypantry/mypantry";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Nav />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>}/>
        <Route path="/recipeProposition" element={<RecipeProposition />} />
        <Route path="/mypantry" element={<Mypantry />} />
      <Route path="/recipePage/:id" element={<RecipePage />} />
      </Routes>
      <Footer />
    </>
  );
}
