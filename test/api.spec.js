const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
const config = require("../knexfile");
const knex = require("knex")(config);
const { BEVERAGE_TABLE } = require("../src/beverage/beverage.model");

const server = setupServer();

describe("api beverage", () => {
  let request;

  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });

  describe("HOME page", () => {
    it("should have 200 status code", async () => {
      const res = await request.get("/");
      expect(res.statusCode).to.equal(200);
    });
  });
  describe("beverage page", () => {
    it("should have 200 status code", async () => {
      const res = await request.get("/beverages");
      expect(res.statusCode).to.equal(200);
    });
  });
});

describe("api post", () => {
  let request;

  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });

  it("should have 200 status code", async () => {
    const res = await request.get("/post");
    expect(res.statusCode).to.equal(200);
  });
});

describe("admin", () => {
  let request;

  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });

  it("should have 200 status code", async () => {
    const res = await request.get("/admin");
    expect(res.statusCode).to.equal(200);
  });

  it("should patch data", async () => {
    before(async () => {
      await knex(BEVERAGE_TABLE)
        .insert([
          {
            id: 9999,
            isSeasonal: true,
            name: "めんつゆ",
            shop: "1",
            category: "1",
          },
        ])
        .returning("id")
        .then((result) => {
          console.log("inserted test mentsuyu");
        })
        .catch(console.error);
    });

    after(async () => {
      await knex(BEVERAGE_TABLE)
        .where("id", 9999)
        .returning("id")
        .del()
        .then((result) => {
          console.log("removed test menntsuyu");
        })
        .catch(console.error);
    });

    const res = await request.put("/admin/put").send({
      id: 9999,
      name: "出汁醤油",
    });
    expect(JSON.parse(res.text)[0]).to.deep.equal({
      id: 9999,
      isSeasonal: true,
      name: "出汁醤油",
      shop: 1,
      category: 1,
    });
  });

  it("should post data", async () => {
    after(async () => {
      await knex(BEVERAGE_TABLE)
        .where("id", 9999)
        .returning("id")
        .del()
        .then((result) => {
          console.log("removed test menntsuyu");
        })
        .catch(console.error);
    });

    const res = await request.post("/admin/post").send({
      id: 9999,
      name: "めんつゆ",
      isSeasonal: true,
      shop: 1,
      category: 1,
    });
    expect(JSON.parse(res.text)[0]).to.deep.equal({
      id: 9999,
      name: "めんつゆ",
      isSeasonal: true,
      shop: 1,
      category: 1,
    });
    expect(
      await knex.where("id", 9999).select().from("beverage").returning("*")
    ).to.deep.equal([
      {
        id: 9999,
        name: "めんつゆ",
        isSeasonal: true,
        shop: 1,
        category: 1,
      },
    ]);
  });
});
