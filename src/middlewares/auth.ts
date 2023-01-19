import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";

// interface ReqWUser extends Request {
//   user: any;
// }

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user?: User;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token
  const token = req.headers["x-access-token"];

  // Check if token was passed
  if (!token) {
    return res.status(401).json({
      errors: [" A token  was not passed"]
    });
  }

  // Verify token
  try {
    const decoded = <jwt.JwtPayload>(
      jwt.verify(String(token), String(process.env.JWT_SECRET))
    );

    req.user = decoded.user;
  } catch (error) {
    return res.status(401).json({
      errors: ["Invalid token"]
    });
  }

  return next();
};

export default verifyToken;
