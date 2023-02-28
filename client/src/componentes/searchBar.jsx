import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions/action";
import styles from "./searchBar.module.css"


export default function SearchBar(props){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    };
    function handleButton(e){
        e.preventDefault();
        dispatch(searchByName(name))
        .then(() =>{ props.returnToFirstPage()})        
    };

    return (
        <div className={styles.searchContainer}>
            <input className={styles.searchInput} type="text" 
            placeholder='Search by name' color="white" 
            onChange={(e) => handleChange(e)}/>
            <button className={styles.buttonSearch} type='submit' onClick={ (e) => handleButton(e)} >Search</button>
        </div>
    )
}