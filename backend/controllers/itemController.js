const mongodb = require("mongodb");
const { connectToDatabase } = require("../data/database");

const getAllItems = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection("items").find().toArray();
    res.status(200).json(items);
  } catch (error) {
    console.error("GET ALL ITEMS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleItem = async (req, res) => {
  try {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Item ID" });
    }

    const itemId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();
    const item = await db.collection("items").findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("GET SINGLE ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, category, effect, price, rarity } = req.body;

    if (
      !name ||
      !category ||
      !effect ||
      price === undefined ||
      !rarity
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const item = {
      name,
      category,
      effect,
      price,
      rarity
    };

    const db = await connectToDatabase();
    const result = await db.collection("items").insertOne(item);

    res.status(201).json({
      message: "Item created successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error("CREATE ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Item ID" });
    }

    const itemId = new mongodb.ObjectId(req.params.id);
    const { name, category, effect, price, rarity } = req.body;

    if (
      !name ||
      !category ||
      !effect ||
      price === undefined ||
      !rarity
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const item = {
      name,
      category,
      effect,
      price,
      rarity
    };

    const db = await connectToDatabase();
    const result = await db.collection("items").replaceOne({ _id: itemId }, item);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("UPDATE ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Item ID" });
    }

    const itemId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();

    const result = await db.collection("items").deleteOne({ _id: itemId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem
};