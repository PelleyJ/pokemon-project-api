const mongodb = require("mongodb");
const { connectToDatabase } = require("../data/database");

const getAllPokemon = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const pokemon = await db.collection("pokemon").find().toArray();
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving pokemon" });
  }
};

const getSinglePokemon = async (req, res) => {
  try {
    const pokemonId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();
    const pokemon = await db.collection("pokemon").findOne({ _id: pokemonId });

    if (!pokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving pokemon" });
  }
};

const createPokemon = async (req, res) => {
  try {
    const {
      name,
      type,
      level,
      hp,
      attack,
      defense,
      speed,
      trainer,
      region
    } = req.body;

    if (
      !name ||
      !type ||
      level === undefined ||
      hp === undefined ||
      attack === undefined ||
      defense === undefined ||
      speed === undefined ||
      !trainer ||
      !region
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const pokemon = {
      name,
      type,
      level,
      hp,
      attack,
      defense,
      speed,
      trainer,
      region
    };

    const db = await connectToDatabase();
    const result = await db.collection("pokemon").insertOne(pokemon);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating pokemon" });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const pokemonId = new mongodb.ObjectId(req.params.id);

    const {
      name,
      type,
      level,
      hp,
      attack,
      defense,
      speed,
      trainer,
      region
    } = req.body;

    if (
      !name ||
      !type ||
      level === undefined ||
      hp === undefined ||
      attack === undefined ||
      defense === undefined ||
      speed === undefined ||
      !trainer ||
      !region
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const pokemon = {
      name,
      type,
      level,
      hp,
      attack,
      defense,
      speed,
      trainer,
      region
    };

    const db = await connectToDatabase();
    const result = await db
      .collection("pokemon")
      .replaceOne({ _id: pokemonId }, pokemon);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error updating pokemon" });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const pokemonId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();

    const result = await db.collection("pokemon").deleteOne({ _id: pokemonId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    res.status(200).json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pokemon" });
  }
};

module.exports = {
  getAllPokemon,
  getSinglePokemon,
  createPokemon,
  updatePokemon,
  deletePokemon
};