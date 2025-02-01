const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../server"); // Import the Express app
const mongoose = require("mongoose");
const FAQ = require("../models/FAQ");

chai.use(chaiHttp);

describe("FAQ API Routes", () => {
    let faqId;

    // Before all tests, ensure database is connected
    before(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await FAQ.deleteMany({}); // Clear existing data
    });

    // Test Create FAQ (POST)
    it("should create a new FAQ", (done) => {
        chai.request(app)
            .post("/api/faqs")
            .send({
                question: "What is Node.js?",
                answer: "Node.js is a JavaScript runtime.",
                translations: { es: "¿Qué es Node.js?" }
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("_id");
                expect(res.body).to.have.property("question", "What is Node.js?");
                faqId = res.body._id;
                done();
            });
    });

    // Test Get All FAQs (GET)
    it("should fetch all FAQs", (done) => {
        chai.request(app)
            .get("/api/faqs")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                expect(res.body.length).to.be.greaterThan(0);
                done();
            });
    });

    // Test Get Single FAQ by ID (GET)
    it("should fetch a single FAQ by ID", (done) => {
        chai.request(app)
            .get(`/api/faqs/${faqId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("_id", faqId);
                done();
            });
    });

    // Test Get FAQ with Translation (GET with lang query)
    it("should fetch an FAQ with a Spanish translation", (done) => {
        chai.request(app)
            .get(`/api/faqs/${faqId}?lang=es`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("question", "¿Qué es Node.js?");
                done();
            });
    });

    // Test Update FAQ (PUT)
    it("should update an existing FAQ", (done) => {
        chai.request(app)
            .put(`/api/faqs/${faqId}`)
            .send({ question: "Updated Question?", answer: "Updated Answer." })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("question", "Updated Question?");
                done();
            });
    });

    // Test Delete FAQ (DELETE)
    it("should delete an FAQ", (done) => {
        chai.request(app)
            .delete(`/api/faqs/${faqId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("message", "FAQ deleted successfully");
                done();
            });
    });

    // Cleanup database after tests
    after(async () => {
        await FAQ.deleteMany({});
        await mongoose.connection.close();
    });
});
