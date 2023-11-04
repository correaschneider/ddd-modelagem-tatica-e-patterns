import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer('123', 'Pedro Schneider');
const address = new Address('Servidão Pedro Manoel Fernandez', 63, '88062400', 'Floripa');
customer.Address = address;
customer.activate();

const item1 = new OrderItem('i1', 'p1', 'Item 1', 10, 2);
const item2 = new OrderItem('i2', 'p2', 'Item 2', 15);
const order = new Order('1', '123', [item1, item2]);