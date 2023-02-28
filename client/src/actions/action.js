import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON= "POST_POKEMON";
export const ORDER_BY_WEIGHT= "ORDER_BY_WEIGHT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_TYPES = "ORDER_BY_TYPES";
export const ORDER_API_DB = "ORDER_API_DB";
export const DETAIL_VACIO = "DETAIL_VACIO";
export const ORDER_ATTACK = "ORDER_ATTACK"
export function getPokemons() {
    return async function(dispatch){
        let res = await axios.get("http://localhost:3001/pokemons")
        return dispatch({type: GET_POKEMONS, payload: res.data})
    }
}            

export function searchByName(name) {
    return async function (dispatch) {
        let res = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        return dispatch({ type: SEARCH_BY_NAME, payload: res.data })
    }
};

export function getDetail(id) {
    return async function (dispatch) {
        let res = await axios.get(`http://localhost:3001/pokemon/${id}`);
        return dispatch({ type: GET_POKEMON_DETAIL, payload: res.data })
    }
};

export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}

export function orderAttack(payload){
    return{
        type:ORDER_ATTACK,
        payload
    }
}
export function orderApiDb(payload){
    return{
        type:ORDER_API_DB,
        payload
    }
}
export function vaciarDetail(payload){
    return{
        type:DETAIL_VACIO,
        payload
    }
}

export function getTypes(){
    return async function (dispatch){
        let res = await axios.get(`http://localhost:3001/types`)
        return dispatch({type: GET_TYPES, payload:res.data})
    }
}

export function orderByWeight(payload){
    return{
        type: ORDER_BY_WEIGHT,
        payload
    }
}
export function orderByTypes(payload){
    return{
        type: ORDER_BY_TYPES,
        payload
    }
}

export function postPokemon (input) {
    return async function (dispatch){
        try {
            const res = await axios.post(`http://localhost:3001/pokemon`, input);
            return dispatch({ type:POST_POKEMON, payload: res.data})
        } catch (error) {
           console.log(error);
        }
      
    }
}
