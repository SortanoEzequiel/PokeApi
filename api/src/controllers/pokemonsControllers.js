require('dotenv').config()
const axios = require("axios")
const {Types, Pokemon} = require('../db.js')

async function getPokemon(){
    const pokemonData = await axios('https://pokeapi.co/api/v2/pokemon?limit=120');

    const resultUrl = await pokemonData.data.results.map(a=>a.url);
    const arrayContent = await Promise.all( resultUrl.map(async a=> {
        let contenido = [];
        let c = await axios(a);
        contenido.push(c.data)
        return contenido;
    }));
    let pokeArray = []

    // let Dataataque = await arrayContent[0].map(el => {return { name: el.stats[1]}})
    // let ataque = Dataataque.map(el => {return {name: el.name.stat.url}}) 
    // let ataques = await axios(ataque[0].name)  
    // let dataAtack = ataques.data.affecting_moves.decrease.map(el => el.move.name)

    // let Datadefense = await arrayContent[0].map(el => {return { name: el.stats[2]}})
    // let defensa = Datadefense.map(el => {return {name: el.name.stat.url}}) 
    // let defens = await axios(defensa[0].name)  
    // let dataDefense = defens.data.affecting_moves.decrease.map(el => el.move.name)

    for(let i = 0 ; i < arrayContent.length ; i++){
        pokeArray = arrayContent.map(el => {
            return{
                id: el[0].id,
                name:el[0].name,
                sprites:el[0].sprites.other.dream_world.front_default,
                life:el[0].stats[0].base_stat,
                weight:el[0].weight,
                height:el[0].height,
                types:el[0].types.map(el => {return{name:el.type.name}}),
                attack:el[0].stats[1].base_stat,
                defense:el[0].stats[2].base_stat,
                speed:el[0].stats[5].base_stat,
                api:true,
            }
        })
    }
    return{
   pokeArray
    }
}

const getDb = async function (){
    const DbInfo = await Pokemon.findAll({
        include :{
            model:Types,
            attributes:["name"]
        }
    })
    return DbInfo
}

const getPokeName = async function (req,res){
    const {name} = req.query

    const apiInf = await getPokemon();
    const apiInfo = apiInf.pokeArray
    const dbInfo = await getDb();
    const allData = [...apiInfo,...dbInfo]
   
    try {
        if(name){
            const pokemon = allData.filter((e) => e.name.toLowerCase() === name.toLowerCase()) 
            res.send(pokemon)
        } else{
            res.send(allData)
        }
    } catch (error) {
        res.status(400).json({status:400, message:error.message})
    }
}
module.exports = {
    getPokeName,
    getDb,
    getPokemon,  
}
  

