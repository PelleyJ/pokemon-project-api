const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const pokemonRoutes = require("./routes/pokemon");
const trainerRoutes = require("./routes/trainer");
const gymRoutes = require("./routes/gym");
const itemRoutes = require("./routes/item");
const authRoutes = require("./routes/user");
require("./config/passport");

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
app.use("/gyms", gymRoutes);
app.use("/items", itemRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Pokemon API is running");
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON format." });
  }
  next(err);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;