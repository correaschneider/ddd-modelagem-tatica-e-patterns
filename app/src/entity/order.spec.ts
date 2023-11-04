import Order from "./order";
import OrderItem from "./order_item";

describe("Order iunit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Items quantity must be greater than 0");
    });

    it("should calculate total", () => {
        // Arrange
        const item = new OrderItem("i1", "Item 1", 10);
        const item2 = new OrderItem("i2", "Item 2", 10);
        const order = new Order("o1", "c1", [item]);

        // Act
        let total = order.total();

        // Assert
        expect(total).toBe(10);

        // Arrange
        const order2 = new Order("o2", "c2", [item, item2]);

        // Act
        total = order2.total();

        // Assert
        expect(total).toBe(20);
    });
});