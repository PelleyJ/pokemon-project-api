const mongodb = require("mongodb");
const { connectToDatabase } = require("../data/database");

const getAllGyms = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gyms = await db.collection("gyms").find().toArray();
    res.status(200).json(gyms);
  } catch (error) {
    console.error("GET ALL GYMS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleGym = async (req, res) => {
  try {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Gym ID" });
    }

    const gymId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();
    const gym = await db.collection("gyms").findOne({ _id: gymId });

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.status(200).json(gym);
  } catch (error) {
    console.error("GET SINGLE GYM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const createGym = async (req, res) => {
  try {
    const { name, city, region, badge, type, leader } = req.body;

    if (!name || !city || !region || !badge || !type || !leader) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const gym = {
      name,
      city,
      region,
      badge,
      type,
      leader
    };

    const db = await connectToDatabase();
    const result = await db.collection("gyms").insertOne(gym);

    res.status(201).json({
      message: "Gym created successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error("CREATE GYM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateGym = async (req, res) => {
  try {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Gym ID" });
    }

    const gymId = new mongodb.ObjectId(req.params.id);
    const { name, city, region, badge, type, leader } = req.body;

    if (!name || !city || !region || !badge || !type || !leader) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const gym = {
      name,
      city,
      region,
      badge,
      type,
      leader
    };

    const db = await connectToDatabase();
    const result = await db.collection("gyms").replaceOne({ _id: gymId }, gym);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.status(200).json({ message: "Gym updated successfully" });
  } catch (error) {
    console.error("UPDATE GYM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGym = async (req, res) => {
  try {
    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Gym ID" });
    }

    const gymId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();

    const result = await db.collection("gyms").deleteOne({ _id: gymId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.status(200).json({ message: "Gym deleted successfully" });
  } catch (error) {
    console.error("DELETE GYM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGyms,
  getSingleGym,
  createGym,
  updateGym,
  deleteGym
};