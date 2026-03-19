const mongodb = require("mongodb");
const { connectToDatabase } = require("../data/database");

const getAllTrainers = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const trainers = await db.collection("trainers").find().toArray();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trainers" });
  }
};

const getSingleTrainer = async (req, res) => {
  try {
    const trainerId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();
    const trainer = await db.collection("trainers").findOne({ _id: trainerId });

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trainer" });
  }
};

const createTrainer = async (req, res) => {
  try {
    const { name, age, region, badgeCount, favoriteType } = req.body;

    if (
      !name ||
      age === undefined ||
      !region ||
      badgeCount === undefined ||
      !favoriteType
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const trainer = {
      name,
      age,
      region,
      badgeCount,
      favoriteType
    };

    const db = await connectToDatabase();
    const result = await db.collection("trainers").insertOne(trainer);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating trainer" });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const trainerId = new mongodb.ObjectId(req.params.id);
    const { name, age, region, badgeCount, favoriteType } = req.body;

    if (
      !name ||
      age === undefined ||
      !region ||
      badgeCount === undefined ||
      !favoriteType
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const trainer = {
      name,
      age,
      region,
      badgeCount,
      favoriteType
    };

    const db = await connectToDatabase();
    const result = await db
      .collection("trainers")
      .replaceOne({ _id: trainerId }, trainer);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error updating trainer" });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const trainerId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();

    const result = await db.collection("trainers").deleteOne({ _id: trainerId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trainer" });
  }
};

module.exports = {
  getAllTrainers,
  getSingleTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer
};