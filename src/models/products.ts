// @ts-ignore
import client from "../database";

export type Product = {
  id: number;
  name: string;
  type: string;
  weight: number;
};

export class MythicalWeapons {
  async getProducts(): Promise<Weapon[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM mythical_weapons";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannon get weapons ${error}`);
    }
  }

  // Show
  // Create [token required]
  // [OPTIONAL] Top 5 most popular products
  // [OPTIONAL] Products by category (args: product category)
}
