import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div id="home">
      <div id="header">
        <img src="/public/Img/Home/imageHome.png" alt="image" />
      </div>

      <div className="letscook">
        <p>Let's Cook</p>
        <p></p>
      </div>

      <div className="container">

        <div className="bloc">

          <div id="containeurText">
            <h1>Master Your Kitchen with SmartPantry</h1>
            <p>Transform the way you manage your food inventory. Our app helps you track ingredients and discover delicious recipes tailored to what you have on hand.</p>
            <div id="containeurBtn">
              <a id="signin" href="">Sign in</a>
              <a id="btnLearnMore" href="">Learn More</a>
            </div>
          </div>

          <div id="containeurImageRecette">
            <img id="imageRecette" src="/public/Img/Home/recette.png" alt="" />
            <img id="imagePoivre" src="/public/Img/Home/sel.png" alt="" />
          </div>

        </div>

        <div id="blocTextFeature">
          <div id="containeurTextFeature">
            <h3>Features</h3>
            <h1>Explores Our Innovative Features</h1>
          </div>
          <p>Our app is designed to make food management effortless. With features like inventory alerts and shopping list creation, you'll never run out of essentials. Plus, barcode scanning simplifies tracking your ingredients.</p>
        </div>
        
        <img id="infoImage" src="/public/Img/Home/info.png" alt="" />

        <div id="containeurChefReviews">
          <div id="gauche">
            <h1>Chef Reviews</h1>
            <p>Find out what others think of our recipes!</p>
            <img src="/public/Img/Home/fourchette.png" alt="" />
          </div>
          <div id="droite">
            <img src="client/public/Img/Home/avis.png" alt="" />
          </div>
        </div>

        <div id="containeurcontrolkitchen">
          <h1>Take Controls of Your Kitchen</h1>
          <p>Sign In our app now to simplify meal planning and reduce food waste effortlessly.</p>
          <div id="containeurBtn">
            <a id="signin" href="">Sign in</a>
            <a id="btnLearnMore" href="">Learn More</a>
          </div>
        </div>
      
      </div>

    </div>
  );
}
