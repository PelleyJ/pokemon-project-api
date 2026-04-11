const request = require("supertest");
const app = require("../server");

describe("API GET Tests", () => {
  test("GET /pokemon returns 200", async () => {
    const res = await request(app).get("/pokemon");
    expect(res.statusCode).toBe(200);
  });

  test("GET /trainers returns 200", async () => {
    const res = await request(app).get("/trainers");
    expect(res.statusCode).toBe(200);
  });

  test("GET /gyms returns 200", async () => {
    const res = await request(app).get("/gyms");
    expect(res.statusCode).toBe(200);
  });

  test("GET /items returns 200", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
  });
});