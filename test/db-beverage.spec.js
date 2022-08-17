const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);

describe("db beverage", () => {
  it("should be a good app", () => {
    expect(false).to.equal(true);
  });
});
