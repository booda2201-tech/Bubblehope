export class CartItem {
id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  extras?: any[];
  sugarLevel?: string;
  iceLevel?: string;
  image?: string;
  constructor(id: number, name: string, price: number, quantity: number, total: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.total = total;
    this.extras = [];
    this.sugarLevel = '';
    this.iceLevel = '';
  }

}

