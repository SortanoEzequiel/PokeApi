require('dotenv').config()
const axios = require("axios");
const {Pokemon, Types} = require('../db');


async function pokemonPost (req, res, next){
const { id, name, weight, height, sprites, attack, life, speed, defense, typesId } = req.body
try {
    const pokemonCreated = await Pokemon.create({
        id,
        name,
        life,
        weight,
        height, 
        sprites,
        attack,
        speed,
        defense,
        db:true,
    });

    const relacion = await Types.findAll({
        where:{
            name: typesId
        }
    })
    pokemonCreated.addTypes(relacion);
    res.send(pokemonCreated)
} catch (error) {
    next(error)
   }
}


module.exports = {
    pokemonPost,
}