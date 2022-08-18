const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");

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

describe.only("api post", () => {
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
