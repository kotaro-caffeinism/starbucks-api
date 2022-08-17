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

  // it("should be a good app", () => {
  //   expect(false).to.equal(true);
  // });

  describe("api HOME page", () => {
    it("should have 200 status code", async () => {
      const res = await request.get("/api");
      expect(res.statusCode).to.equal(200);
    });
  });
});
