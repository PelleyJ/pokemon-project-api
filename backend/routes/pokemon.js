const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Get all pokemon
 *     description: Retrieve a list of all pokemon
 *     responses:
 *       200:
 *         description: A list of pokemon
 */
router.get("/", pokemonController.getAllPokemon);

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Get a single pokemon by ID
 *     description: Retrieve one pokemon using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single pokemon
 *       404:
 *         description: Pokemon not found
 */
router.get("/:id", pokemonController.getSinglePokemon);

/**
 * @swagger
 * /pokemon:
 *   post:
 *     summary: Create a new pokemon
 *     description: Add a new pokemon to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - level
 *               - hp
 *               - attack
 *               - defense
 *               - speed
 *               - trainer
 *               - region
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               level:
 *                 type: number
 *               hp:
 *                 type: number
 *               attack:
 *                 type: number
 *               defense:
 *                 type: number
 *               speed:
 *                 type: number
 *               trainer:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pokemon created successfully
 */
router.post("/", pokemonController.createPokemon);

/**
 * @swagger
 * /pokemon/{id}:
 *   put:
 *     summary: Update a pokemon by ID
 *     description: Replace an existing pokemon using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - level
 *               - hp
 *               - attack
 *               - defense
 *               - speed
 *               - trainer
 *               - region
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               level:
 *                 type: number
 *               hp:
 *                 type: number
 *               attack:
 *                 type: number
 *               defense:
 *                 type: number
 *               speed:
 *                 type: number
 *               trainer:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       204:
 *         description: Pokemon updated successfully
 *       404:
 *         description: Pokemon not found
 */
router.put("/:id", pokemonController.updatePokemon);

/**
 * @swagger
 * /pokemon/{id}:
 *   delete:
 *     summary: Delete a pokemon by ID
 *     description: Remove a pokemon from the database using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pokemon deleted successfully
 *       404:
 *         description: Pokemon not found
 */
router.delete("/:id", pokemonController.deletePokemon);

module.exports = router;