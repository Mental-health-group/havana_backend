const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../server");
const { createClient } = require("../services/clientService");
chai.use(chaiHttp);

describe("Client Controller", () => {
  describe("Client Registration", () => {
    it("Should register a new client", async () => {
      const clientData = {
        name: "Test Client",
        email: "testclient@example.com",
        password: "testpassword",
      };

      const res = await chai
        .request(app)
        .post("/api/client/register")
        .send(clientData);

      expect(res).to.have.status(201);
      expect(res.body)
        .to.have.property("message")
        .equal("Client registered successfully");
      expect(res.body).to.have.property("client");
    });
  });

  describe("Get Client Profile", () => {
    it("Should get client profile", async () => {
      const client = await createClient(
        "Test Client",
        "testclient@example.com",
        "testpassword"
      );

      const res = await chai.request(app).get(`/api/client/${client._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("name").equal(client.name);
      expect(res.body).to.have.property("email").equal(client.email);
    });
  });
});
