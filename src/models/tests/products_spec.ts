import { Product, Products } from "../products";
const products = new Products();

describe("Products Model", () => {
  it("should have a getProducts() method", () => {
    expect(products.getProducts).toBeDefined();
  });

  it("should have a getProduct() method", () => {
    expect(products.getProduct).toBeDefined();
  });

  it("should have a getProductByCategory() method", () => {
    expect(products.getProductsByCategory).toBeDefined();
  });

  it("should have a createProduct() method", () => {
    expect(products.createProduct).toBeDefined();
  });

  it("createProduct method should create a new Product", async () => {
    const result = await products.createProduct({
      category: "Food",
      name: "Poundo Poweder",
      price: 34
    });

    expect(result).toEqual({
      id: 1,
      category: "Food",
      name: "Poundo Poweder",
      price: 34
    });
  });

  it("getProducts method should return a list of products", async () => {
    const result = await products.getProducts();
    expect(result).toEqual([
      {
        id: 1,
        category: "Food",
        name: "Poundo Poweder",
        price: 34
      }
    ]);
  });

  it("getProduct method should return a product", async () => {
    const result = await products.getProduct(1);
    expect(result).toEqual({
      id: 1,
      category: "Food",
      name: "Poundo Poweder",
      price: 34
    });
  });

  it("getProductByCategory method should return a list of products within a category", async () => {
    const result = await products.getProductsByCategory("Food");
    expect(result).toEqual([
      {
        id: 1,
        category: "Food",
        name: "Poundo Poweder",
        price: 34
      }
    ]);
  });
});
