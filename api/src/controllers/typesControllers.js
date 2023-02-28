require('dotenv').config()
const axios = require("axios")
const {Types, Pokemon} = require('../db.js')


const typesPokemon = async function(req, res){
    const apiInfo = await axios("https://pokeapi.co/api/v2/type")
    const types = await apiInfo.data.results.map(el =>  el.name)
    types.forEach(type => Types.findOrCreate({where: {name:type}}))

    const allTypes = await Types.findAll()
    res.send(allTypes)
}

module.exports={
    typesPokemon,
}