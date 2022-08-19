const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
const config = require("../knexfile");
const knex = require("knex")(config);
const beverageModel = require("../src/beverage/beverage.model.js");
const adminModel = require("../src/admin/admin.model.js");
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

  describe("admin home", () => {
    it("should have 200 status code", async () => {
      const res = await request.get("/admin");
      expect(res.statusCode).to.equal(200);
    });
  });

  describe.only("put", () => {
    it("should patch data", async () => {
      const res = await request.put(
        encodeURI(
          "/admin/put?_method=put&id=13&name=ジュース&category=&shop&isSeasonal="
        )
      );
      expect(
        await knex.where("id", 13).select().from("beverage").returning("*")
      ).to.deep.equal([
        {
          id: 13,
          name: "出汁醤油",
          isSeasonal: true,
          shop: 1,
          category: 1,
        },
      ]);
    });
  });

  describe("post", () => {
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
    it("should post data", async () => {
      const res = await request.post("/admin/post").send({
        id: 9999,
        name: "めんつゆ",
        isSeasonal: true,
        shop: 1,
        category: 1,
      });
      expect(JSON.parse(res.text)).to.deep.equal({
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

  describe("delete", () => {
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
        .then(async (result) => {
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
    it("should delete data", async () => {
      const res = await request.delete("/admin/delete/9999");

      expect(JSON.parse(res.text)[0]).to.deep.equal({
        id: 9999,
        name: "めんつゆ",
        isSeasonal: true,
        shop: 1,
        category: 1,
      });
      expect(
        await knex.where("id", 9999).select().from("beverage").returning("*")
      ).to.deep.equal([]);
    });
  });
});

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
