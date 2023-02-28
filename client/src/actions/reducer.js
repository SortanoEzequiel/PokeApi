import { 
    GET_POKEMONS,
    SEARCH_BY_NAME,
    GET_POKEMON_DETAIL,
    GET_TYPES,
    POST_POKEMON, 
    ORDER_BY_NAME,
    ORDER_BY_TYPES,
    ORDER_API_DB,
    DETAIL_VACIO,
    ORDER_ATTACK,
} from "./action";

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    post:[],
    types:[],
    filtrados:[],
};


function rootReducer (state = initialState, action){
    switch (action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                filtrados: action.payload,
            };
        case SEARCH_BY_NAME:
                return {
                    ...state,
                    filtrados: action.payload,
                };
        case GET_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload,
            }
        case DETAIL_VACIO:
            return{
                ...state,
                pokemonDetail:[],
            }
        case ORDER_BY_NAME:
            let pokemon = state.filtrados
            const pokemonsSorted = action.payload === 'asc'?
            pokemon.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }):
            pokemon.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            console.log(state.pokemons)
            return{
                ...state,
                filtrados: pokemonsSorted
                
            }
        case ORDER_ATTACK:
            let poke = state.pokemons 
            const pokemonOrder = action.payload === 'Attack-Max'?
            poke.sort((a, b) => {
                if(a.attack > b.attack) return 1;
                if(b.attack > a.attack) return -1;
                return 0;
            }):
            poke.sort((a, b) => { 
                if(a.attack > b.attack) return -1;
                if(b.attack > a.attack) return 1;
                return 0;
            })
            return{
                ...state,
                filtrados:pokemonOrder,
            }
        case ORDER_API_DB:
            let filterApi = [];
            let filterDb = []; 
            let filterAll = [];
            let pokemons = state.pokemons 
            filterDb =  state.pokemons.filter(el => el.db === true)
            filterApi = state.pokemons.filter(el => el.api === true)
            filterAll = pokemons
            switch(action.payload){
                case 'api':
                    return{
                        ...state,
                        filtrados:filterApi,
                    }
                case 'db':
                    return{
                        ...state,
                        filtrados:filterDb,
                    }
                case 'all':
                    return{
                        ...state,
                        filtrados:filterAll
                    }
            }
        case GET_TYPES:
        return{
            ...state,
            types: action.payload
        }
        case ORDER_BY_TYPES:
            let type =[];
            if(action.payload) {
            type = state.pokemons.filter(element => element.types.map(el => el.name).includes(action.payload))
            } return {...state, filtrados:type}      
        case POST_POKEMON:
            return{
                ...state
            }
            default: return state
    }
}

export default rootReducer;