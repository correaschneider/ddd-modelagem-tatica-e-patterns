import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required")
    });


    /**
     * Triple A
     *
     * Arrange
     * Act
     * Assert
     */
    it("should change name", () => {
        // Arrange
        const customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane")
    });

    it("should activate customer", () => {
        // Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "88062-400", "Florianópolis");
        customer.Address = address;

        // Act
        customer.activate();

        // Assert
        expect(customer.isActive()).toBe(true)
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {
        // Arrange
        const customer = new Customer("1", "Customer 1");

        // Act
        customer.deactivate();

        // Assert
        expect(customer.isActive()).toBe(false)
    });
});