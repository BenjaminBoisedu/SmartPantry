import React from "react";
import "./Home.css";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RiFileListLine } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaAngleRight, FaQ } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";
import FAQ from "../../Components/FAQ/faq";

export default function Home() {
  return (
    <div id="home">
      <div id="header">
        <img src="./Img/Home/imageHome.png" alt="image" />

        <div className="letscook">
          <p>Let's Cook</p>
          <IoIosArrowRoundDown className="arrow-icon" />
        </div>
      </div>

      <div className="container">
        <div className="bloc">
          <div id="containeurText">
            <h1>Master Your Kitchen with SmartPantry</h1>
            <p>
              Transform the way you manage your food inventory. Our app helps
              you track ingredients and discover delicious recipes tailored to
              what you have on hand.
            </p>
            <div id="containeurBtn">
              <a id="signin" href="">
                Sign in
              </a>
              <a id="btnLearnMore" href="">
                Learn More
              </a>
            </div>
          </div>

          <div id="containeurImageRecette">
            <img id="imageRecette" src="./Img/Home/recette.png" alt="" />
            <img id="imagePoivre" src="./Img/Home/sel.png" alt="" />
          </div>
        </div>

        <div id="blocTextFeature">
          <div id="containeurTextFeature">
            <h3>Features</h3>
            <h1>Explores Our Innovative Features</h1>
          </div>
          <p>
            Our app is designed to make food management effortless. With
            features like inventory alerts and shopping list creation, you'll
            never run out of essentials. Plus, barcode scanning simplifies
            tracking your ingredients.
          </p>
        </div>

        {/* <img id="infoImage" src="/public/Img/Home/info.png" alt="" /> */}

        <div>
          <div id="allCard">
            <div id="card">
              <FaLightbulb className="icon" />
              <h3>Stay Update with Inventory Alerts</h3>
              <p>Recieve timely notifications when your stock is low</p>
            </div>
            <div id="card">
              <RiFileListLine className="icon" />
              <h3>Create Custom Shopping Lists Effortlesly</h3>
              <p>Organize your grocery needs with ease.</p>
            </div>
            <div id="card">
              <FaRegBell className="icon" />
              <h3>No Need to Think About What to Eat Anymore.</h3>
              <p>Generate an infinite number of recipes.</p>
            </div>
          </div>
          <div id="containeurBtn">
            <a id="btnLearnMore" href="">
              Learn More
            </a>
            <div>
              <a id="signin" href="">
                Sign up
              </a>
              <FaAngleRight />
            </div>
          </div>
        </div>

        <div id="containeurChefReviews">
          <div id="gauche">
            <h1>Chef Reviews</h1>
            <p>Find out what others think of our recipes!</p>
            <img src="./Img/Home/fourchette.png" alt="" />
          </div>
          <div id="droite">
            <img src="./Img/Home/avis.png" alt="" />
          </div>
        </div>

        <div id="containeurcontrolkitchen">
          <h1>Take Controls of Your Kitchen</h1>
          <p>
            Sign In our app now to simplify meal planning and reduce food waste
            effortlessly.
          </p>
          <div id="containeurBtn">
            <a id="signin" href="">
              Sign in
            </a>
            <a id="btnLearnMore" href="">
              Learn More
            </a>
          </div>
        </div>

        <FAQ />

        <div id="containeurcontrolkitchen">
          <h1>Still have questions ?</h1>
          <p>We're help to help you !</p>
          <div>
            <a id="btnLearnMore" href="">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
