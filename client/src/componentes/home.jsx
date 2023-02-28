import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {getPokemons, orderByName, getTypes, orderByTypes, orderApiDb, vaciarDetail, orderAttack} from "../actions/action";
import Card from "./card";
import styles from "./home.module.css";
import Paginate from "./paginate";
import SearchBar from "./searchBar";



export default function Home() {
    const dispatch = useDispatch();
    const pokemons= useSelector(state=>state.pokemons)
    const type = useSelector(state => state.types)
    const filtrados = useSelector(state => state.filtrados)


    


    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const lastPokemon = pokemonsPerPage  * currentPage;
    const firstpokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(firstpokemon, lastPokemon) 
    const currentFiltro = filtrados.slice(firstpokemon, lastPokemon)
    const [state, setState] = useState(1)

    useEffect(()=>{
        dispatch(getPokemons()) 
        dispatch(getTypes())
        dispatch(vaciarDetail())
    },[dispatch])


    function handleOrderByName(e){
        dispatch(orderByName(e.target.value))
        setState(state + 1)
    }
    function handleOrderApiDb(e){
        dispatch(orderApiDb(e.target.value))
        setCurrentPage(1);
        setState(state + 1)
    }

    function handlerOrderByTypes(e) {
        dispatch(orderByTypes(e.target.value))
        setCurrentPage(1);
        setState(state + 1)
    }
    function handleOrderAttack(e){
        dispatch(orderAttack(e.target.value))
        setState(state + 1)
    }
    const paginate = (number) => {
        setCurrentPage(number)
    };

    function returnToFirstPage () {
        setCurrentPage(1)
    }
    return (
        
        <div className={styles.home}>
            {
               
            <div className={styles.filtros}>
                <SearchBar returnToFirstPage = {returnToFirstPage}/>
                <select onChange={e => handleOrderByName(e)} defaultValue='default' className = {styles.filters}>
                    <option value={'asc'}>A-Z</option>
                    <option>Z-A</option>
                </select>
                <select onChange={e => handleOrderAttack(e)} defaultValue='default' className = {styles.filters}>
                    <option value={'Attack-Min'}>Attack-Max</option>
                    <option value ={'Attack-Max'}>Attack-Min</option>
                </select>
                <select onChange={e => handleOrderApiDb(e)} defaultValue='default' className = {styles.filters}>
                    <option value={'all'}>All</option>
                    <option value={'api'}>Api</option>
                    <option value={'db'}>Db</option>
                   
                </select>
               
                 
              <select onChange={e => handlerOrderByTypes(e)} defaultValue='default' className={styles.filters}>
                       
                        <option value = "default">Elegir tipo</option>
                        {
                           type && type.map(a => (
                                <option value = {a.name} key={a.id}> {a.name} </option>))
                        }
              </select>
                
            </div>
               
            
            }
            <div>
                <Paginate 
                pokemonsPerPage={pokemonsPerPage}
                pokemons={pokemons?.length}
                paginate={paginate}
                currentPage={currentPage}
                />

                <div className={styles.contenedor}>
                    {
                       
                   
                           currentPokemons === 1? currentPokemons.map( el => {
                            return <Card name={el.name} types={el.types.map(el => el.name)} id={el.id} img={el.sprites} key={el.id} /> }):
                           currentFiltro.map( el => {
                            return <Card name={el.name} types={el.types.map(el => el.name)} id={el.id} img={el.sprites} key={el.id} /> })
                        
                   }
                    
                </div>
             </div>
        </div>
    )
}