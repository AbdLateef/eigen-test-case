const express = require("express");
const app = require("../index");

const request = require("supertest");
describe("Get Endpoints", () => {
  it("should get the books", async () => {
    const res = await request(app).get("/books").send();
    expect(res.statusCode).toEqual(200);
  });
  it("should get the members", async () => {
    const res = await request(app).get("/members").send();
    expect(res.statusCode).toEqual(200);
  });
  it("should get the members along with the books they lend", async () => {
    const res = await request(app).get("/transaction/all").send();
    expect(res.statusCode).toEqual(200);
  });
  it("should get the current member transaction", async () => {
    const res = await request(app).get("/current-transaction/M001").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe('Post Endpoints', () => {
  it('should create a new lend', async () => {
    const res = await request(app)
      .post('/checkin')
      .send({
        book_code: "NRN-7",
        member_code: "M001"
      })
    expect(res.statusCode).toEqual(200)
  });
  it('should create a new returned', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({
        transaction_id: "35",
        member_code: "M001"
      })
    expect(res.statusCode).toEqual(200)
  });

});
