const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokeName} = require('../controllers/pokemonsControllers');
const { pokemonPost } = require('../controllers/postControllers');
const { typesPokemon } = require('../controllers/typesControllers');
const { getIdPokemon } = require('../controllers/getIdControllers');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/pokemon/:id",getIdPokemon)
router.use("/pokemons", getPokeName)
router.post("/pokemon", pokemonPost)
router.use("/types", typesPokemon)

module.exports = router;
