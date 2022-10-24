const supertest = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Product = require("../models/product");

const api = supertest(app);

// Delete all products at the very start so we have a clear state for testing
beforeAll(async () => await Product.deleteMany({}));

describe("POST product at /", () => {
  test("POST product with valid data", async () => {
    const productToAdd = {
      name: "Coat",
      quantity: 25,
      price: 89.99,
      color: "blue",
      size: "M",
    };
    await api
      .post("/")
      .send(productToAdd)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const products = await Product.find({});
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Coat");
  });

  test("POST product with invalid data", async () => {
    const productToAdd = {
      name: "Test product",
      price: 100,
    };
    await api
      .post("/")
      .send(productToAdd)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET products at /", () => {
  test("returns all products", async () => {
    const response = await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(1);
  });

  test("returns a specific product with id", async () => {
    const products = await Product.find({});
    const response = await api
      .get(`/${products[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.name).toBe("Coat");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
