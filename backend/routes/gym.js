const express = require("express");
const router = express.Router();
const gymController = require("../controllers/gymController");

/**
 * @swagger
 * /gyms:
 *   get:
 *     summary: Get all gyms
 *     description: Retrieve a list of all gyms
 *     responses:
 *       200:
 *         description: A list of gyms
 */
router.get("/", gymController.getAllGyms);

/**
 * @swagger
 * /gyms/{id}:
 *   get:
 *     summary: Get a single gym by ID
 *     description: Retrieve one gym using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single gym
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Gym not found
 */
router.get("/:id", gymController.getSingleGym);

/**
 * @swagger
 * /gyms:
 *   post:
 *     summary: Create a new gym
 *     description: Add a new gym to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - region
 *               - badge
 *               - type
 *               - leader
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               badge:
 *                 type: string
 *               type:
 *                 type: string
 *               leader:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gym created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", gymController.createGym);

/**
 * @swagger
 * /gyms/{id}:
 *   put:
 *     summary: Update a gym by ID
 *     description: Replace an existing gym using its MongoDB ID
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
 *               - city
 *               - region
 *               - badge
 *               - type
 *               - leader
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               badge:
 *                 type: string
 *               type:
 *                 type: string
 *               leader:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gym updated successfully
 *       400:
 *         description: Invalid ID or missing fields
 *       404:
 *         description: Gym not found
 */
router.put("/:id", gymController.updateGym);

/**
 * @swagger
 * /gyms/{id}:
 *   delete:
 *     summary: Delete a gym by ID
 *     description: Remove a gym from the database using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gym deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Gym not found
 */
router.delete("/:id", gymController.deleteGym);

module.exports = router;