import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Order, OrderStatus, Orders } from "../models/orders";

const orders = new Orders();
const router = Router();

export interface ReqWUser extends Request {
  user: any;
}

// Create Order
router.post(
  "/",
  body("product_id").notEmpty().isNumeric(),
  body("quantity").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const { product_id, quantity }: Order = req.body;
    const userId: number = req.user?.id;

    try {
      // Verify input
      // Confirm that all values are not empty
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = await orders.createOrder({
        product_id,
        quantity,
        user_id: userId
      });

      return res.json({
        order
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  }
);

// Get Order by user
router.get("/", async (req: Request, res: Response) => {
  const userId: number = req.user?.id;

  try {
    const allOrders = await orders.getUserOrder(userId);
    return res.json({
      orders: allOrders
    });
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
});
export default router;
