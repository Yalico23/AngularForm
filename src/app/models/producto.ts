export class Producto {
    id: number;
    name: string;
    price: number;
    description: string;

    constructor(id: number, name: string, price: number, description: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
