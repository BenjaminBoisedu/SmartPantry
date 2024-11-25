import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const Network = [
    {
      id: 1,
      name: "Facebook",
      icon: <IoLogoFacebook />,
      link: "#",
    },
    {
      id: 2,
      name: "Twitter",
      icon: <FaXTwitter />,
      link: "#",
    },
    {
      id: 3,
      name: "Instagram",
      icon: <IoLogoInstagram />,
      link: "#",
    },
    {
      id: 4,
      name: "Linkedin",
      icon: <FaLinkedin />,
      link: "#",
    },
    {
      id: 5,
      name: "Youtube",
      icon: <IoLogoYoutube />,
      link: "#",
    },
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerText">
          <h3>SmartPantry</h3>
          <div className="links">
            <ul>
              <li>
                <Link to="/">Home Page</Link>
              </li>
              <li>
                <Link to="#">A propos de nous</Link>
              </li>
              <li>
                <Link to="/ajout_recettes">Contacter nous</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerNetwork">
          <h2>Follow Us</h2>
          <div className="network">
            <ul>
              {Network.map((network) => (
                <li key={network.id}>
                  <Link to={network.link}>{network.icon}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footerMentions">
          <p>© 2024 SmartPantry. All Rights Reserved</p>
          <div className="mentions">
            <ul>
              <li>
                <Link to="#">Terms of Use</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Cookie Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
