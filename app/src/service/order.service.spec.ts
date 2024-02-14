import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.serivce";

describe("Order service unit tests", () => {
  it("should place an Order", () => {
    // Arrange
    const customer = new Customer("c1", "Customer 1");
    const orderItem1 = new OrderItem("io1", "i1", "Item 1", 10, 1);

    // Act
    const order = OrderService.placeOrder(customer, [orderItem1]);

    // Assert
    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    // Arrange
    const orderItem1 = new OrderItem("io1", "item1", "Item 1", 10, 1);
    const orderItem2 = new OrderItem("io2", "item2", "Item 2", 20, 2);

    const order1 = new Order("o1", "c1", [orderItem1]);
    const order2 = new Order("o2", "c1", [orderItem2]);

    // Act
    const total = OrderService.total([order1, order2]);

    // Assert
    expect(total).toBe(50);
  });
});