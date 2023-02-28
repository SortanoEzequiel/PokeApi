import React from "react";
import styles from "./paginate.module.css";

const Paginate = (props) => {
    const pageNum = [];
    for (let i = 1; i <= Math.ceil(props.pokemons/props.pokemonsPerPage); i++){
        pageNum.push(i)
    }
    return (
        <div className={styles.center}>
            <ul className={styles.pagination}>
                {
                    pageNum && pageNum.map(num => (
                        <li key={num}>
                            <button key={num} onClick={() => props.paginate(num)}
                            style={ num === props.currentPage ? { backgroundColor: 'green', color: 'black', border: '1px solid black'} : {}}
                            >{num}</button>                            
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Paginate;