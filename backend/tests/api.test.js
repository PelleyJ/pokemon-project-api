const request = require("supertest");
const app = require("../server");

describe("API GET Tests", () => {

  // GET ALL
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

  test("GET /pokemon/:id returns 200 or 404", async () => {
    const res = await request(app).get("/pokemon/507f1f77bcf86cd799439011");
    expect([200, 404]).toContain(res.statusCode);
  });

  test("GET /trainers/:id returns 200 or 404", async () => {
    const res = await request(app).get("/trainers/507f1f77bcf86cd799439011");
    expect([200, 404]).toContain(res.statusCode);
  });

  test("GET /gyms/:id returns 200 or 404", async () => {
    const res = await request(app).get("/gyms/507f1f77bcf86cd799439011");
    expect([200, 404]).toContain(res.statusCode);
  });

  test("GET /items/:id returns 200 or 404", async () => {
    const res = await request(app).get("/items/507f1f77bcf86cd799439011");
    expect([200, 404]).toContain(res.statusCode);
  });

});