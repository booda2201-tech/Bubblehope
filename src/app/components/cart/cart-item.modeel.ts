export class CartItem {
  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
  total!: number;
  extras?: any[] = [];
  sugarLevel?: string = '';
  iceLevel?: string = '';
  image?: string;
  selectedOptions: { [key: string]: any } = {};

  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }
}


