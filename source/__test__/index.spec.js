const supertest = require("supertest");
const app = require("../app");

describe("Testing simple rule-validation API '/' route", () => {
  it("Should return my profile object", async () => {
    const expectedData = {
      message: "My Rule-Validation API",
      status: "success",
      data: {
        name: "Ezeani Ikenna",
        github: "@iykeevans",
        email: "elochi238@gmail.com",
        mobile: "07053052215",
        twitter: "@iykeevan",
      },
    };

    const response = await supertest(app).get("/");

    expect(response.body).toEqual(expectedData);
  });
});

describe("Testing simple rule-validation API '/validate-rule' route", () => {
  it("Should throw err if payload is not an object", async () => {
    const payload = [];

    const expectedData = {
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    };

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedData);
  });

  it("Should throw err if rule key is not passed to payload object", async () => {
    const payload = {};

    const expectedData = {
      message: "rule is required.",
      status: "error",
      data: null,
    };

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedData);
  });
});
