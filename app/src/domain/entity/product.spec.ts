import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 10);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("p1", "", 10);
    }).toThrow("Name is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      const product = new Product("p1", "Product 1", -1);
    }).toThrow("Price must be greater than 0");
  });

  it("should change name", () => {
    // Arrange
    const product = new Product("p1", "Product 1", 10);

    // Act
    product.changeName("Product 2");

    // Assert
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    // Arrange
    const product = new Product("p1", "Product 1", 10);

    // Act
    product.changePrice(20);

    // Assert
    expect(product.price).toBe(20);
  });
});