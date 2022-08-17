const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const beverageModel = require("../src/beverage/beverage.model.js");
const BEVERAGE_TABLE = beverageModel.BEVERAGE_TABLE;

describe("db beverage", () => {
  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });
    it("has run the initial migration", () => {
      knex(BEVERAGE_TABLE)
        .select()
        .catch(() => assert.fail("beverage table is not found."));
    });

    describe("getAll", () => {
      it("should return an array of beverages", async () => {
        const customers = await beverageModel.getAll();
        expect(customers).to.be.an.instanceof(Array);
        expect(customers.length).to.be.at.most(12);
      });
      it("should accept a limit argument", async () => {
        const customers = await beverageModel.getAll(3);
        expect(customers.length).to.be.at.most(3);
      });
      it("should join three table", async () => {
        const customers = await beverageModel.getAll(1);
        expect(customers[0].category).to.be.a("string");
        expect(customers[0].shop).to.be.a("string");
      });
    });
  });
});
