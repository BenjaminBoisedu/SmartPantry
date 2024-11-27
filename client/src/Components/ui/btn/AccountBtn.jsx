import React from "react";
import styles from "./accountBtn.module.css"
import { Link } from "react-router-dom";

export default function AccountBtn() {
  return (
    <Link to={"/profile"} className={styles.CtaWhiteGradient} >
                <div className={styles.CtaOrange}>My Account</div>
    </Link>

  );
}
