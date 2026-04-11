const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve a list of all items
 *     responses:
 *       200:
 *         description: A list of items
 */
router.get("/", itemController.getAllItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     description: Retrieve one item using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single item
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Item not found
 */
router.get("/:id", itemController.getSingleItem);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Add a new item to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - effect
 *               - price
 *               - rarity
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               effect:
 *                 type: string
 *               price:
 *                 type: number
 *               rarity:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", itemController.createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     description: Replace an existing item using its MongoDB ID
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
 *               - category
 *               - effect
 *               - price
 *               - rarity
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               effect:
 *                 type: string
 *               price:
 *                 type: number
 *               rarity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid ID or missing fields
 *       404:
 *         description: Item not found
 */
router.put("/:id", itemController.updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     description: Remove an item from the database using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Item not found
 */
router.delete("/:id", itemController.deleteItem);

module.exports = router;