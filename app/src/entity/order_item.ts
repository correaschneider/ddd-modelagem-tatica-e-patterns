export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number = 1;

    constructor(id: string, name: string, price: number, quantity: number = 1) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get price(): number {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}