// @ts-ignore
import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class Products {
  /// Index
  async getProducts(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products${error}`);
    }
  }

  // Show
  async getProduct(id: number): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get single product ${error}`);
    }
  }

  // Create [token required]
  async createProduct(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create products: ${error}`);
    }
  }

  // [OPTIONAL] Top 5 most popular products
  // [OPTIONAL] Products by category (args: product category)
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE category=$1";
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get products by category: ${error}`);
    }
  }
}
