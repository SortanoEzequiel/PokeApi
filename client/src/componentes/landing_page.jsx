import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing_page.module.css";

export default function landingPage(){
    return (
        <div className = {styles.landing}>
            <div className ={styles.div}>
            <Link to="/home" className={styles.link}>
                <button className={styles.button}>Home</button>
            </Link>
            </div>
        </div>
        
    )
}