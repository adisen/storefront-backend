// Current Order by user (args: user id)[token required]
// [OPTIONAL] Completed Orders by user (args: user id)[token required]
// Index [token required]
// Show [token required]
// Create N[token required]
// @ts-ignore
import client from "../database";

export type Cart = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class CartModel {
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Cart> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
