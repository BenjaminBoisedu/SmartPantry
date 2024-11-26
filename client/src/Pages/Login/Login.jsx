import React, { useState } from "react";
import FormLogin from "./FormLogin/FormLogin";
import FormRegister from "./FormRegister/FormRegister";

export default function Login() {
  const [Login, setLogin] = useState(true);

  return (
    <div className="ContainerLogin">
      <div className="login">
        <div className="LoginImg">
          <img
            src="/Img/LoginImg/LoginImg.jpg"
            alt="LoginImg"
            draggable="false"
            // block right-click menu
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="LoginTextContainer">
          {Login ? <FormLogin /> : <FormRegister />}
          <div className="Text-cta">
            <p>
              {Login ? "Doesn’t have an account?" : "Already have an account?"}
            </p>
            <button onClick={() => setLogin(!Login)}>
              {Login ? "Join the brigade" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
