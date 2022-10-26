require("dotenv").config();
const logger = require("./utils/logger");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const productsRouter = require("./controllers/products");

// Connect to MongoDB
logger.info("Connecting to ", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) =>
    logger.error("Error connecting to MongoDB: ", error.message)
  );

// Middleware
const app = express();
morgan.token("body", (req) => JSON.stringify(req.body));
app
  .use(express.json())
  .use(morgan(":method :url :status - :response-time ms :body"))
  .use(cors());

// Routers
app.use("/", productsRouter);

// Have app listen to port 3001 so we can interact with it
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
