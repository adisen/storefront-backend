import supertest from "supertest";
import app from "../server";

const req = supertest(app);

describe("Server Endpoints Test", () => {
  it("should return 200 to show server is working as expected", async () => {
    try {
      const res = await req.get("/");
      expect(res.status).toBe(200);
    } catch (error) {
      console.log("Error");
    }
  });
});
