const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const pokemonRoutes = require("./routes/pokemon");
const trainerRoutes = require("./routes/trainer");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon API",
      version: "1.0.0",
      description: "API documentation for the Pokemon project"
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/pokemon", pokemonRoutes);
app.use("/trainers", trainerRoutes);

app.get("/", (req, res) => {
  res.send("Pokemon API is running");
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON format." });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});