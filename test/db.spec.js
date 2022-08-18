const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const beverageModel = require("../src/beverage/beverage.model.js");
const postModel = require("../src/post/post.model.js");
const adminModel = require("../src/admin/admin.model.js");
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
        const beverages = await beverageModel.getAll();
        expect(beverages).to.be.an.instanceof(Array);
        expect(beverages.length).to.be.at.most(12);
      });
      it("should accept a limit argument", async () => {
        const beverages = await beverageModel.getAll(3);
        expect(beverages.length).to.be.at.most(3);
      });
      it("should join three table", async () => {
        const beverages = await beverageModel.getAll(4);
        expect(beverages[0].category).to.be.a("string");
        expect(beverages[3].shop).to.be.a("string");
      });
    });

    describe("post", () => {
      it("should show user's post", async () => {
        const usersPost = await postModel.getAll();
        expect(usersPost[0].username).to.a("string");
        expect(usersPost[0].description).to.a("string");
      });
    });

    describe("admin", () => {
      it("should show beverage data", async () => {
        const beverages = await adminModel.getAll();
        expect(beverages).to.be.an.instanceof(Array);
        expect(beverages.length).to.be.at.most(12);
      });
    });
  });
});
