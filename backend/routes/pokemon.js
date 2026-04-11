const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const isAuthenticated = require("../middleware/oauthAuth");

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Get all pokemon
 */
router.get("/", pokemonController.getAllPokemon);

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Get a single pokemon by ID
 */
router.get("/:id", pokemonController.getSinglePokemon);

/**
 * @swagger
 * /pokemon:
 *   post:
 *     summary: Create a new pokemon
 */
router.post("/", isAuthenticated, pokemonController.createPokemon);

/**
 * @swagger
 * /pokemon/{id}:
 *   put:
 *     summary: Update a pokemon by ID
 */
router.put("/:id", isAuthenticated, pokemonController.updatePokemon);

/**
 * @swagger
 * /pokemon/{id}:
 *   delete:
 *     summary: Delete a pokemon by ID
 */
router.delete("/:id", pokemonController.deletePokemon);

module.exports = router;