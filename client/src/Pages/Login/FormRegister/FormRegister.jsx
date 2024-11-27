import React from "react";
import { useState } from "react";
import "../CSS/FormRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import RegisterBtn from "../../../Components/ui/btn/RegisterBtn";

export default function FormRegister() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the password and confirm password match
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        Name: Name,
        email: email,
        password: password,
      });
      localStorage.setItem("Name", Name);
      localStorage.setItem("email", email);
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });
      if (response.data) {
        localStorage.setItem("access_token", response.data.access_token);
        setTimeout(() => {
          // Animate the transition with gsap
          gsap.fromTo(
            ".transition",
            {
              // y: "-100vh",
              top: "57rem",
              duration: 2,
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
                e.target.reset();
              },
            }
          );
        }, 200);
      }
    } catch (error) {
      if (email === "" || password === "" || Name === "") {
        alert("Please fill in all fields");
      }
      if (error.response.status === 409) {
        const errorDiv = document.getElementById("error");
        errorDiv.innerText =
          "Ils me semble que vous êtes déjà inscrit, souhaitez-vous vous connecter?";
      }
    }
  };

  return (
    <div className="RegisterTextContainer">
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
        <p>You have successfully registered!</p>
      </div>

      
      <h1>Join the Brigade</h1>
      <div className="returnError">
        <p id="error"></p>
      </div>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="InputContainer">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            className="input"
            name="Name"
            autoComplete="on"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="InputContainer">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm"
            name="confirm"
            className="input"
            autoComplete="on"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <input
            type="checkbox"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        <RegisterBtn />
      </form>
    </div>
  );
}
