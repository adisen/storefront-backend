import { Request, Response, Router } from "express";
import passwordValidator from "password-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User, Users } from "../models/users";
import auth from "../middlewares/auth";

const router = Router();
const validator = new passwordValidator();
const users = new Users();

validator.has().uppercase().has().lowercase().has().digits();

// Fetch all users
router.get("/", auth, async (req: Request, res: Response) => {
  // Check if user already exist
  let allUsers = await users.getUsers();

  return res.json({
    users: [
      ...allUsers.map(user => {
        return { ...user, password: "" };
      })
    ]
  });
});

// Get User By Id
router.get("/:id", auth, async (req: Request, res: Response) => {
  // Check if user already exist
  const { id } = req.params;
  let user = await users.getUser(Number(id));

  return res.json({
    user: { ...user, password: "" }
  });
});

// Register route
router.post(
  "/register",
  body("firstname").notEmpty().isLength({ min: 5, max: 50 }),
  body("lastname").notEmpty().isLength({ min: 5, max: 50 }),
  body("username").notEmpty().isLength({ min: 5, max: 20 }),
  body("password").notEmpty().isLength({ min: 8 }),
  async (req: Request, res: Response) => {
    const { firstname, lastname, username, password }: User = req.body; // Destructing

    // Confirm that all values are not empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!validator.validate(password)) {
      return res
        .status(400)
        .json({ message: "Your password doesn't meet the requreiment" });
    }

    // Check if user already exist
    let user = await users.getUserByUsername(username);
    if (user) {
      return res.status(401).json({ errors: ["Username already taken"] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    // Add user to DB
    user = await users.createUser({
      firstname,
      lastname,
      username,
      password: hashedPassword
    });

    // Construct and send a token
    const token = jwt.sign(
      { user: { ...user, password: "_" } },
      String(process.env.JWT_SECRET)
    );

    return res.json({
      token
    });
  }
);

// Login Route
router.post(
  "/login",
  body("username").notEmpty(),
  body("password").notEmpty(),
  async (req: Request, res: Response) => {
    const { username, password }: User = req.body; // Destructing

    // Confirm that all values are not empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exist
    let user = await users.getUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ errors: ["Your username or password is incorrect"] });
    }

    // Compare passwrod
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ errors: ["Your username or password is incorrect"] });
    }

    // Construct and send a token
    const token = jwt.sign(
      { user: { ...user, password: "_" } },
      String(process.env.JWT_SECRET)
    );

    return res.json({
      token
    });
  }
);

export default router;
