const supertest = require("supertest");
const app = require("../app");

describe("Testing simple rule-validation API index route", () => {
  it("Should return hello world", async () => {
    const response = await supertest(app).get("/");

    expect(response.text).toBe("Hello World");
  });
});
