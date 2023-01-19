// Current Order by user (args: user id)[token required]
// [OPTIONAL] Completed Orders by user (args: user id)[token required]
// Index [token required]
// Show [token required]
// Create N[token required]
// @ts-ignore
import client from "../database";

export enum OrderStatus {
  ACTIVE = "active",
  COMPLETE = "completed"
}

export type Order = {
  id?: number;
  quantity: number;
  status?: OrderStatus;
  product_id: number;
  user_id: number;
};

export class Orders {
  /// Index
  async getUserOrder(userId: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=$1";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get order by a user: ${error}`);
    }
  }

  // Create [token required]
  async createOrder({
    product_id,
    quantity,
    user_id,
    status = OrderStatus.ACTIVE
  }: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders(quantity, status, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *";

      const result = await conn.query(sql, [
        quantity,
        status,
        product_id,
        user_id
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user: ${error}`);
    }
  }
}
