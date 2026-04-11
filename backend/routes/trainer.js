const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");
const isAuthenticated = require("../middleware/oauthAuth");

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Get all trainers
 */
router.get("/", trainerController.getAllTrainers);

/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Get a single trainer by ID
 */
router.get("/:id", trainerController.getSingleTrainer);

/**
 * @swagger
 * /trainers:
 *   post:
 *     summary: Create a new trainer
 */
router.post("/", isAuthenticated, trainerController.createTrainer);

/**
 * @swagger
 * /trainers/{id}:
 *   put:
 *     summary: Update a trainer by ID
 */
router.put("/:id", isAuthenticated, trainerController.updateTrainer);

/**
 * @swagger
 * /trainers/{id}:
 *   delete:
 *     summary: Delete a trainer by ID
 */
router.delete("/:id", trainerController.deleteTrainer);

module.exports = router;