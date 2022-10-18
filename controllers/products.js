const productsRouter = require("express").Router();
const Product = require("../models/product");

productsRouter.get("/", async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

productsRouter.get("/:id", async (request, response) => {
  const productWithId = await Product.findById(request.params.id);
  return response.json(productWithId);
});

productsRouter.post("/", async (request, response) => {
  let productToAdd = request.body;
  if (
    !productToAdd.name ||
    !productToAdd.quantity ||
    !productToAdd.price ||
    !productToAdd.color ||
    !productToAdd.size
  )
    return response
      .status(400)
      .json({ error: "POST request is missing a product" });

  const product = new Product(productToAdd);
  const savedProduct = await product.save();
  response.json(savedProduct);
});

productsRouter.delete("/:id", async (request, response) => {
  await Product.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = productsRouter;
