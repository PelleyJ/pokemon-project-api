const mongodb = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let database;

async function connectToDatabase() {
  if (database) {
    return database;
  }

  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI);
  database = client.db("pokemonDB");
  return database;
}

module.exports = { connectToDatabase };