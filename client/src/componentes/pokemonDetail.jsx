import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useParams } from 'react-router';
import { getDetail, getTypes } from '../actions/action';
import styles from "./pokemonDetail.module.css";


export default function pokemonDetail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const pokemonDetail = useSelector(state => state.pokemonDetail)
    const [tipo,settipo] = useState([])
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id])

 

    


return(
    <div className={styles.div}>
       
        {
         pokemonDetail.length > 0 ?
            <div  > 
                    <h1 className={styles.name}>{pokemonDetail[0].name}</h1>
                    <div className={styles.img}> 
                    <img src={pokemonDetail[0].sprites} alt="" width="420px" height="250px" border="solid"/>
                    </div> 
                    <h1 className={styles.name}>Peso: {pokemonDetail[0].weight} Hg</h1> 
                    <h1 className={styles.name}>Altura: {pokemonDetail[0].height} Dm</h1>
                    <h1 className={styles.name}>Type: {pokemonDetail[0].types.map(el => el.name.split("-"))}</h1> 
                    <h1 className={styles.name}>Attack: {pokemonDetail[0].attack} </h1>
                    <h1 className={styles.name}>Defense: {pokemonDetail[0].defense} </h1>
                    <h1 className={styles.name}>Life: {pokemonDetail[0].life} </h1>
                    <h1 className={styles.name}>Speed: {pokemonDetail[0].speed} </h1>
                  
             </div>
          : <h1>Loading...</h1>
        }
    </div>
)
};  
