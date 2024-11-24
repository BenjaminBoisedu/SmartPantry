import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profil from "./Pages/Profil/Profil";

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
      <div>
        <Header />
        <Outlet />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
