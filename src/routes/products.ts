import { Request, Response, Router } from "express";
import { Product, Products } from "../models/products";
import { body, validationResult } from "express-validator";
import auth from "../middlewares/auth";

const router = Router();
const products = new Products();

// Get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    // Get all products
    const allProducts: Product[] = await products.getProducts();
    res.json({
      products: allProducts
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Get Single Products
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Get all products
    const product: Product = await products.getProduct(Number(id));

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json({
      product
    });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

// Create a product
router.post(
  "/",
  auth,
  body("category").notEmpty(),
  body("name").notEmpty(),
  body("price").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const { category, name, price }: Product = req.body;

    try {
      // Validate input
      // Confirm that all values are not empty
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create Product
      const product = await products.createProduct({ category, name, price });

      res.json({
        product
      });
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  }
);

export default router;
