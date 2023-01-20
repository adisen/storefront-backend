// Index [token required]
// Show [token required]
// Create N[token required]
// @ts-ignore
import client from "../database";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class Users {
  /// Index
  async getUsers(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users: ${error}`);
    }
  }

  // Show
  async getUser(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get single user ${error}`);
    }
  }

  // Create [token required]
  async createUser(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        user.password
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user: ${error}`);
    }
  }

  // Get User by username
  async getUserByUsername(username: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE username=$1";
      const result = await conn.query(sql, [username]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user by username: ${error}`);
    }
  }

  // Delete all users
  async deleteAllUsers(): Promise<void> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "DELETE FROM users";
      await conn.query(sql);
      conn.release();
      // return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete all users: ${error}`);
    }
  }
}
