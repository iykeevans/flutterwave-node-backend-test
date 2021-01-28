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
