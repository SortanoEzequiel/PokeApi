import React from "react";
import styles from "./card.module.css";
import {Link} from "react-router-dom"; 

const Card = (props) => {
    return(
        <div className={styles.caja}>
            <div className={styles.img}>
            <img src={props.img} alt="" width="100%" height="150" /> 
            </div>
            <div className={styles.contenido}>
            <h4 className={styles.h4}>{props.name}</h4>
             <h4 className={styles.h4}>{props.types}</h4>  
            <Link to= {'/pokemon/' + props.id} className={styles.link}>
             <h4 className={styles.h4}>Pokemon-Detail</h4></Link>
            </div>
            

        </div>
    )
}

export default Card