const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../server"); // Assuming your server is exported from server.js
const { createProfessional } = require("../services/professionalService"); // Importing functions from professionalService for test data setup

chai.use(chaiHttp);

describe("Professional Controller", () => {
  describe("Professional Registration", () => {
    it("Should register a new professional", async () => {
      const professionalData = {
        name: "Test Professional",
        email: "testprofessional@example.com",
        password: "testpassword",
      };

      const res = await chai
        .request(app)
        .post("/api/professional/register")
        .send(professionalData);

      expect(res).to.have.status(201);
      expect(res.body)
        .to.have.property("message")
        .equal("Professional registered successfully");
      expect(res.body).to.have.property("professional");
    });
  });

  describe("Get Professional Profile", () => {
    it("Should get professional profile", async () => {
      const professional = await createProfessional(
        "Test Professional",
        "testprofessional@example.com",
        "testpassword"
      );

      const res = await chai
        .request(app)
        .get(`/api/professional/${professional._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("name").equal(professional.name);
      expect(res.body).to.have.property("email").equal(professional.email);
    });
  });
});
