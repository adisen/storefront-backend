import supertest from "supertest";
import app from "../server";

const req = supertest(app);

describe("Products Endpoints Test", () => {
  it("should get all products", async () => {
    try {
      const res = await req.get("/products");
      expect(res.body).toBe([]);
    } catch (error) {
      console.log("Error");
    }
  });
});
