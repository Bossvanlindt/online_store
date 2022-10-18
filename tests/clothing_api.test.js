const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);

describe("GET at root", () => {
  test("returns all products", async () => {
    const response = await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(2);
  });

  test("returns a specific product with id", async () => {
    const response = await api
      .get("/0b0738d5-3e34-4472-b85b-de7ed157923a")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.name).toBe("Coat");
  });
});
