require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("uuid");

morgan.token("body", (req) => JSON.stringify(req.body));

// Middleware
const app = express();
app
  .use(express.json())
  .use(morgan(":method :url :status - :response-time ms :body"))
  .use(cors());

// Stores all items in our online store
let products = new Map();
products.set("0b0738d5-3e34-4472-b85b-de7ed157923a", {
  name: "Coat",
  quantity: 25,
  price: 89.99,
  color: "blue",
  size: "M",
  id: "0b0738d5-3e34-4472-b85b-de7ed157923a",
});
products.set("c65427f9-e185-4256-8a6f-125f8098c1d4", {
  name: "Hoodie",
  quantity: 3,
  price: 60.0,
  color: "orange",
  size: "L",
  id: "c65427f9-e185-4256-8a6f-125f8098c1d4",
});

app.get("/", (request, response) => {
  response.json(Array.from(products.values()));
});

app.get("/:id", (request, response) => {
  const productWithId = products.get(request.params.id);
  return response.json(productWithId);
});

app.post("/", (request, response) => {
  let productToAdd = request.body;
  if (!productToAdd)
    return response
      .status(400)
      .json({ error: "POST request is missing a product" });

  const id = uuid.v4();
  productToAdd = { ...productToAdd, id };

  products.set(id, productToAdd);
  response.json(productToAdd);
});

// Have app listen to port 3001 so we can interact with it
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
