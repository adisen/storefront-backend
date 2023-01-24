import { User, Users } from "../users";
import { Product, Products } from "../products";
import { Order, OrderStatus, Orders } from "../orders";

const users = new Users();
const products = new Products();
const orders = new Orders();

describe("Users Model", () => {
  let user: User, product: Product;

  // Clear DB after all
  afterAll(async () => {
    await orders.deleteAllOrders();
    await products.deleteAllProducts();
    await users.deleteAllUsers();
  });

  beforeAll(async () => {
    user = await users.createUser({
      firstname: "John",
      lastname: "Doe",
      password: "JohnDoe@2023",
      username: "johndoe"
    });

    // Create a product
    product = await products.createProduct({
      category: "Food",
      name: "Poundo Poweder",
      price: 34
    });
  });

  it("should have a createOrder method", () => {
    expect(orders.createOrder).toBeDefined();
  });

  it("should have a getUserOrder() method", () => {
    expect(orders.getUserOrder).toBeDefined();
  });

  it("createOrder method should create a new Order", async () => {
    // Create an order
    const result = await orders.createOrder({
      product_id: Number(product.id),
      quantity: 34,
      user_id: Number(user.id),
      status: OrderStatus.ACTIVE
    });

    expect(result).toEqual({
      id: 1,
      quantity: 34,
      product_id: Number(product.id),
      status: OrderStatus.ACTIVE,
      user_id: Number(user.id)
    });
  });

  it("getOrders method should return a list of orders by a user", async () => {
    const result = await orders.getUserOrder(Number(user.id));

    expect(result).toEqual([
      {
        id: 1,
        quantity: 34,
        product_id: Number(product.id),
        status: OrderStatus.ACTIVE,
        user_id: Number(user.id)
      }
    ]);
  });
});
