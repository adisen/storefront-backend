import express, { Request, Response } from "express";
import cors from "cors";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());
app.use(cors());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
