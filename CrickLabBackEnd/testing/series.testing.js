const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Replace with the correct path to your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe("Series API CRUD Tests", () => {
  let createdSeriesId;

  // Create a new Series
  it("should create a new Series", (done) => {
    const newSeries = {
      name: "Test Series",
      type: "One Day",
      over: 50,
      teams: 10,
    };
    chai
      .request(app)
      .post("/series/addSeries")
      .send(newSeries)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("name", "Test Series");
        expect(res.body).to.have.property("over", '50');
        createdSeriesId = res.body.id; // Store the created Series's ID for later tests
        done();
      });
  });

  // Read all Seriess
  it("should retrieve all Seriess", (done) => {
    chai
      .request(app)
      .get("/Series")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});
