const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

const endpoint = "/api/v1/customers";

describe("Customers", () => {
  beforeEach((done) => {
    chai
      .request(app)
      .delete(endpoint)
      .end(() => done());
  });

  describe("GET /", () => {
    it("should return all customers", (done) => {
      chai
        .request(app)
        .get(endpoint)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("POST /", () => {
    it("empty body should return error", (done) => {
      chai
        .request(app)
        .post(endpoint)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.include("property 'name'");
          done();
        });
    });

    it("wrong age type should return error", (done) => {
      chai
        .request(app)
        .post(endpoint)
        .send({ name: "Tester", age: "100" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.include("type(s) number");
          done();
        });
    });
  });
});
