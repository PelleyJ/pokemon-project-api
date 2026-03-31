const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");
const isAuthenticated = require("../middleware/oauthAuth");

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Get all trainers
 *     description: Retrieve a list of all trainers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of trainers
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, trainerController.getAllTrainers);

/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Get a single trainer by ID
 *     description: Retrieve one trainer using its MongoDB ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single trainer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainer not found
 */
router.get("/:id", verifyToken, trainerController.getSingleTrainer);

/**
 * @swagger
 * /trainers:
 *   post:
 *     summary: Create a new trainer
 *     description: Add a new trainer to the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - region
 *               - badgeCount
 *               - favoriteType
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               region:
 *                 type: string
 *               badgeCount:
 *                 type: number
 *               favoriteType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trainer created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, trainerController.createTrainer);

/**
 * @swagger
 * /trainers/{id}:
 *   put:
 *     summary: Update a trainer by ID
 *     description: Replace an existing trainer using its MongoDB ID
 *     security:
 *       - bearerAuth: []
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
 *               - age
 *               - region
 *               - badgeCount
 *               - favoriteType
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               region:
 *                 type: string
 *               badgeCount:
 *                 type: number
 *               favoriteType:
 *                 type: string
 *     responses:
 *       204:
 *         description: Trainer updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainer not found
 */
router.put("/:id", verifyToken, trainerController.updateTrainer);

/**
 * @swagger
 * /trainers/{id}:
 *   delete:
 *     summary: Delete a trainer by ID
 *     description: Remove a trainer from the database using its MongoDB ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trainer deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainer not found
 */
router.delete("/:id", verifyToken, trainerController.deleteTrainer);

module.exports = router;