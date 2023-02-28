import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, postPokemon} from "../actions/action";
import styles from './pokemonCreate.module.css'

function validate(post) {
    let errors = {};

    if (!post.name) {
        errors.name = 'Ingresar nombre de pokemon'
    }
    
    if (!post.weight) {
        errors.weight = 'Ingresar peso '
    }

    if (!post.height) {
        errors.height= 'Ingresar altura '
    }
    if (!post.sprites) {
        errors.spritres= 'Ingresar imagen'
    }
   
    return errors;
}

export default function DogCreate() {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    const [post, setPost] = useState({
        name: "",
        weight: "",
        height:"",
        attack:'',
        defense:"",
        typesId:"",
        sprites:"https://elvortex.com/wp-content/uploads/2018/03/HddtBOT-1068x601.png",
       
    })

    function handleInputChange(e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }));
    };
    function handleInputAttack(e){
        if(!post.attack.includes(e.target.value))
        setPost({
            ...post,
            attack:[e.target.value]
        });
        setErrors(validate({
            ...post,
            attack:[e.target.value]
        }))
    }
    function handleInputDefense(e){
        if(!post.defense.includes(e.target.value))
        setPost({
            ...post,
            defense:[e.target.value]
        });
        setErrors(validate({
            ...post,
            defense:[e.target.value]
        }))
    }
    function handleSelectPokemon(e){
        if(!post.typesId.includes(e.target.value))
        setPost({
            ...post,
            typesId: [...post.typesId, e.target.value]
        })
        setErrors(validate({
            ...post,
            typesId: [...post.typesId, e.target.value]
        }));
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) alert("Por favor rellenar todos los campos")
        else {
            dispatch(postPokemon(post))
            alert('¡Pokemon creado!')
        }
    };

       

    return (
        <div className={styles.container}>
            <div className={styles.bkg} />
            <div className={styles.bkgcolor}>
                <div className={styles.form}>
                    <h1>Please fill in all the fields</h1>
                    <form onSubmit={e => handleSubmit(e)}>
                       
                        <div>
                            <label>Pokemon's Name</label>
                            <input type="text"  value={post.name} name='name' onChange={e => handleInputChange(e)} />
                            {errors.name && (
                                <p>{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label>Peso</label>
                            <input type="number" value={post.weight} name='weight' onChange={e => handleInputChange(e)} />
                            {errors.weight&& (
                                <p>{errors.weight}</p>
                            )}
                        </div>  
                        <div>
                            <label>Altura</label>
                            <input type="number" value={post.height} name='height' onChange={e => handleInputChange(e)} />
                            {errors.height&& (
                                <p>{errors.height}</p>
                            )}
                        </div>   
                        <div>
                            <label>Attack</label>
                            <input type="array" value={post.attack} name='attack' onChange={e => handleInputAttack(e)} />
                            {errors.attack&& (
                                <p>{errors.attack}</p>
                            )}
                        </div>   
                        <div>
                            <label>Defense</label>
                            <input type="array" value={post.defense} name='defense' onChange={e => handleInputDefense(e)} />
                            {errors.defense&& (
                                <p>{errors.defense}</p>
                            )}
                        </div>    
                        {/* <div>
                            <label>Image</label>
                            <input type="text"  value={post.sprites} name='sprites' onChange={e => handleInputChange(e)} />
                            {errors.sprites && (
                                <p>{errors.sprites}</p>
                            )}
                        </div> */}
                        <div>
                            <label>Types</label>
                            <input type="array" value={post.typesId} name='typesId' onChange={e => handleInputChange(e)} />
                            {errors.typesId&& (
                                <p>{errors.typesId}</p>
                            )}
                        </div> 
            
                                 
                        
                         <div>
                            <select onChange={e => handleSelectPokemon(e)}value='default'
                            className={styles.dietSelect}>
                                <option value="default" disabled className={styles.dietOption}>Elegir tipo</option>
                                {
                                    types && types.map(d => (
                                        <option value={d.typestId} key={d.id} className={styles.dietOption}>{d.name}</option>
                                    ))
                                }
                            </select>
                            {errors.pokemons&& (
                                <p style={{ float: 'right' }}>{errors.pokemons}</p>
                            )}
                        </div> 
                        <button type='submit' className={styles.createButton}>¡Crear!</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )                         
};