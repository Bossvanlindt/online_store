require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const shortid = require("shortid");

// Middleware
const app = express();
app.use(express.json());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

// Stores all items in our online store
let products = [
  {
    name: "Coat",
    quantity: 25,
    price: 89.99,
    color: "blue",
    gender: "F",
    id: "FOPP--E09",
  },
  {
    name: "Hoodie",
    quantity: 3,
    price: 60.0,
    color: "orange",
    gender: "M",
    id: "t55JmYnxB",
  },
];

app.get("/", (request, response) => response.json(products));

app.get("/:id", (request, response) => {
  const productWithId = products.find(
    (product) => product.id === request.params.id
  );
  response.json(productWithId);
});

app.post("/", (request, response) => {
  let productToAdd = request.body;
  if (!productToAdd)
    return response
      .status(400)
      .json({ error: "POST request is missing a product" });

  const id = shortid.generate();
  productToAdd = { ...productToAdd, id };

  products = products.concat(productToAdd);
  response.json(productToAdd);
});

// Have app listen to port 3001 so we can interact with it
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
