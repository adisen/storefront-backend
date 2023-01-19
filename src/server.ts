import express, { Request, Response } from "express";
import cors from "cors";
import users from "./routes/users";
import products from "./routes/products";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());
app.use(cors());

// Routes
app.use("/users", users);
app.use("/products", products);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
