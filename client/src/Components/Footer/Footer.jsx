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
      name: "Instagram",
      icon: <IoLogoInstagram />,
      link: "#",
    },
    {
      id: 3,
      name: "Twitter",
      icon: <FaXTwitter />,
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
                <Link to="#">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/getstarted">Get Started</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
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
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms of Service</Link>
              </li>
              <li>
                <Link to="#">Cookies Settings</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
