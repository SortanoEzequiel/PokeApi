require('dotenv').config()
const axios = require("axios")
const {Types, Pokemon} = require('../db.js')
const {getPokemon, getDb} = require('./pokemonsControllers')



async function getIdPokemon(req, res) {
  let {id} = req.params
  const pokeDb = await getDb()
  const pokeAp = await getPokemon()
  const pokeApi= pokeAp.pokeArray
  const allData=[...pokeApi, ... pokeDb]

try {
    if(id){
        const pokemon = allData.filter((e) => e.id.toString() === id) 
        res.send(pokemon)
    }else{
        res.send(allData)
    }
} catch (error) {
    res.status(400).json({status:400, message:error.message})
}
}

module.exports = {
getIdPokemon,
}



    
    