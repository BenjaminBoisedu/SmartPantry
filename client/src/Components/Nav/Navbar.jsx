import React from "react";
import { useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import LoginBtn from "../ui/btn/LoginBtn";
import AccountBtn from "../ui/btn/AccountBtn";

const Navbar = () => {
  const accessToken = localStorage.getItem("access_token");

  return (
    <div className={styles.navBar}>
      <div className={styles.navLeft}>
        <p className={styles.navTitle}>
          SmartPantry
        </p>
      </div>
      <div className={styles.navRight}>
      {!accessToken ? (
          <li>
            <LoginBtn />
          </li>
        ) : (
          <>
            <Link className={styles.navLink} to="/inventory">Inventory</Link>
            <Link className={styles.navLink} to="/enerate">Recipe Ideas</Link>
            <Link className={styles.navLink} to="/List">Shopping List</Link>
            <AccountBtn />
          </>
        )}
      </div>        
    </div>
  );
};

export default Navbar;
