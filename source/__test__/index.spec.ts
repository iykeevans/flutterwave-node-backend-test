const supertest = require("supertest");

const { formatError } = require("../helpers/formatters");

interface IPayload {
  rule?: IRule;
  data?: any;
}

interface IRule {
  field?: any;
  condition?: any;
  condition_value?: any;
}

let app: any;
beforeAll(async () => {
  const mod = await import("../app");
  app = (mod as any).default;
});

test("Test if route does not exist", async () => {
  const { statusCode, ...rest } = formatError("current route does not exist.");

  const response = await supertest(app).get("/crazy-route");

  expect(response.status).toBe(statusCode);
  expect(response.body).toEqual(rest);
});

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
  it("Should throw err if payload is an invalid json", async () => {
    const payload: [] = [];

    const { statusCode, ...rest } = formatError("Invalid JSON payload passed.");

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule is not passed to payload object", async () => {
    const payload = {};

    const { statusCode, ...rest } = formatError("rule is required.");

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.field is not passed to payload object", async () => {
    const payload = {
      rule: {},
    };

    const { statusCode, ...rest } = formatError("rule.field is required.");

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.field value is not a string", async () => {
    const payload: IPayload = {
      rule: {
        field: null,
      },
    };

    const { statusCode, ...rest } = formatError(
      "rule.field should be a string."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.field value is an empty string", async () => {
    const payload = {
      rule: {
        field: "",
      },
    };

    const { statusCode, ...rest } = formatError(
      "rule.field should not be an empty string."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.condition is not passed in payload", async () => {
    const payload = {
      rule: {
        field: "5",
      },
    };

    const { statusCode, ...rest } = formatError("rule.condition is required.");

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.condition value is not one of [eq, neq, gt, gte, contains]", async () => {
    const payload: IPayload = {
      rule: {
        field: "5",
        condition: null,
      },
    };

    const { statusCode, ...rest } = formatError(
      "rule.condition should be one of [eq, neq, gt, gte, contains]."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.condition_value is not passed to payload", async () => {
    const payload = {
      rule: {
        field: "5",
        condition: "eq",
      },
    };

    const { statusCode, ...rest } = formatError(
      "rule.condition_value is required."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.condition_value value is not one of [string, number]", async () => {
    const payload: IPayload = {
      rule: {
        field: "5",
        condition: "eq",
        condition_value: null,
      },
    };

    const { statusCode, ...rest } = formatError(
      "rule.condition_value should be one of [string, number]."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if rule.condition_value value is an empty string", async () => {
    const payload = {
      rule: {
        field: "5",
        condition: "eq",
        condition_value: "",
      },
    };

    const { statusCode, ...rest } = formatError(
      "rule.condition_value should not be an empty string."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if data is not passed to payload object", async () => {
    const payload = {
      rule: {
        field: "5",
        condition: "eq",
        condition_value: "5",
      },
    };

    const { statusCode, ...rest } = formatError("data is required.");

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if data value is not one of [string, array, object]", async () => {
    const payload: IPayload = {
      rule: {
        field: "5",
        condition: "eq",
        condition_value: "5",
      },
      data: null,
    };

    const { statusCode, ...rest } = formatError(
      "data should be one of [string, array, object]."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  it("Should throw err if data value is an empty string", async () => {
    const payload = {
      rule: {
        field: "5",
        condition: "eq",
        condition_value: "5",
      },
      data: "",
    };

    const { statusCode, ...rest } = formatError(
      "data should not be an empty string."
    );

    const response = await supertest(app).post("/validate-rule").send(payload);

    expect(response.status).toBe(statusCode);
    expect(response.body).toEqual(rest);
  });

  describe("Test if rule.field is missing from data", () => {
    it("Should throw err if rule.field key is missing from data [object]", async () => {
      const payload = {
        rule: {
          field: "5",
          condition: "eq",
          condition_value: "5",
        },
        data: {},
      };

      const { statusCode, ...rest } = formatError(
        "field 5 is missing from data"
      );

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(statusCode);
      expect(response.body).toEqual(rest);
    });

    it("Should throw err if rule.field key is missing from data [array]", async () => {
      const payload = {
        rule: {
          field: "5",
          condition: "eq",
          condition_value: "5",
        },
        data: ["ty"],
      };

      const { statusCode, ...rest } = formatError(
        "field 5 is missing from data."
      );

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(statusCode);
      expect(response.body).toEqual(rest);
    });

    it("Should throw err if rule.field key is missing from data [string]", async () => {
      const payload = {
        rule: {
          field: "5",
          condition: "eq",
          condition_value: "5",
        },
        data: "ty",
      };

      const { statusCode, ...rest } = formatError(
        "field 5 is missing from data."
      );

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(statusCode);
      expect(response.body).toEqual(rest);
    });
  });

  describe("Test validation for string data", () => {
    it("Should throw err if validation failed [string]", async () => {
      const payload = {
        rule: {
          field: "0",
          condition: "eq",
          condition_value: "a",
        },
        data: "damien-marley",
      };

      const expectedData = {
        message: "field 0 failed validation.",
        status: "error",
        data: {
          validation: {
            error: true,
            field: "0",
            field_value: "d",
            condition: "eq",
            condition_value: "a",
          },
        },
      };

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expectedData);
    });

    it("Should return success if validation succeed [string]", async () => {
      const payload = {
        rule: {
          field: "0",
          condition: "eq",
          condition_value: "d",
        },
        data: "damien-marley",
      };

      const expectedData = {
        message: "field 0 successfully validated.",
        status: "success",
        data: {
          validation: {
            error: false,
            field: "0",
            field_value: "d",
            condition: "eq",
            condition_value: "d",
          },
        },
      };

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedData);
    });
  });

  describe("Test validation for array data", () => {
    it("Should throw err if validation failed [array]", async () => {
      const payload = {
        rule: {
          field: "5",
          condition: "contains",
          condition_value: "rocinante",
        },
        data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho", "somto"],
      };

      const expectedData = {
        message: "field 5 failed validation.",
        status: "error",
        data: {
          validation: {
            error: true,
            field: "5",
            field_value: "somto",
            condition: "contains",
            condition_value: "rocinante",
          },
        },
      };

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expectedData);
    });

    it("Should return success if validation succeed [array]", async () => {
      const payload = {
        rule: {
          field: "5",
          condition: "contains",
          condition_value: "rocinante",
        },
        data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho", "rocinante"],
      };

      const expectedData = {
        message: "field 5 successfully validated.",
        status: "success",
        data: {
          validation: {
            error: false,
            field: "5",
            field_value: "rocinante",
            condition: "contains",
            condition_value: "rocinante",
          },
        },
      };

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedData);
    });
  });

  describe("Test validation for object data", () => {
    it("Should throw err if validation failed [object]", async () => {
      const payload = {
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 25,
            successful: 44,
            failed: 1,
          },
        },
      };

      const expectedData = {
        message: "field missions.count failed validation.",
        status: "error",
        data: {
          validation: {
            error: true,
            field: "missions.count",
            field_value: 25,
            condition: "gte",
            condition_value: 30,
          },
        },
      };

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expectedData);
    });

    it("Should return success if validation succeed [object]", async () => {
      const payload = {
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      };

      const expectedData = {
        message: "field missions.count successfully validated.",
        status: "success",
        data: {
          validation: {
            error: false,
            field: "missions.count",
            field_value: 45,
            condition: "gte",
            condition_value: 30,
          },
        },
      };

      const response = await supertest(app)
        .post("/validate-rule")
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedData);
    });
  });
});
