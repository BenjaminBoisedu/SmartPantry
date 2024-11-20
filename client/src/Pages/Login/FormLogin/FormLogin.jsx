import React from "react";
import { useState } from "react";
import axios from "axios";
import "../CSS/FormLogin.css";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import LoginBtn from "../../../Components/ui/btn/LoginBtn";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const tl = gsap.timeline();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });
      if (response.data) {
        localStorage.setItem("access_token", response.data.access_token);
        setTimeout(() => {
          gsap.fromTo(
            ".transition",
            {
              top: "57rem",
              duration: 1,
              opacity: 1,
              zIndex: 1,
            },
            {
              top: "0",
              duration: 2,
              opacity: 1,
              zIndex: 1,
              ease: "back.out(1.7)",
              onComplete: () => {
                navigate("/");
              },
            }
          );
          tl.to(".bi-check-circle", {
            delay: 0.5,
            rotate: 360,
            duration: 2,
            ease: "back.out(1.7)",
          });
        }, 500);
      }
    } catch (error) {
      alert("Identifiants incorrects");
      const errorDiv = document.getElementById("error");
      errorDiv.innerText = "Identifiants incorrects";
    }
  };

  return (
    <>
      <div className="transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="currentColor"
          className="bi bi-check-circle"
          viewBox="0 0 16 16"
          color="green"
        >
          <path
            fillRule="evenodd"
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.854 5.146a.5.5 0 0 0-.708-.708L7 9.293 5.854 8.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4z"
          />
        </svg>
        <h1>Success</h1>
        <p>You have successfully logged in!</p>
      </div>
      <div className="LoginTextContainer">
        <h1>Connexion</h1>
        <div className="returnError">
          <p id="error"></p>
        </div>
        <form action="" method="POST" onSubmit={handleSubmit} id="FormLogin">
          <div className="InputContainer">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="input"
              name="email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="InputContainer">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input"
              name="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <LoginBtn />
        </form>
      </div>
    </>
  );
}
