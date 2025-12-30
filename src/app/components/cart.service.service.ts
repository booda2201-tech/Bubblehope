import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map} from 'rxjs';
import { CartItem } from '../components/cart/cart-item.modeel';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);


  cart$ = this.cartSubject.asObservable();

  constructor() {

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }

// addToCart(newItem: CartItem) {
//   const currentItems = this.cartSubject.value;

//   const existingItem = currentItems.find(item => item.cartItemId === newItem.cartItemId);

//   if (existingItem) {
//     existingItem.quantity += 1;
//     existingItem.total = (existingItem.price + extrasCost) * existingItem.quantity;
//   } else {
//     currentItems.push(newItem);
//   }
//   this.cartSubject.next([...currentItems]);
// }

addToCart(newItem: CartItem): void {
  const currentItems = this.cartSubject.value;

  const existingItemIndex = currentItems.findIndex(item =>
    item.id === newItem.id &&
    item.sugarLevel === newItem.sugarLevel &&
    item.iceLevel === newItem.iceLevel &&
    JSON.stringify(item.extras) === JSON.stringify(newItem.extras)
  );

  if (existingItemIndex > -1) {

    currentItems[existingItemIndex].quantity += 1;
    currentItems[existingItemIndex].total = currentItems[existingItemIndex].price * currentItems[existingItemIndex].quantity;
    this.updateCart([...currentItems]);
  } else {

    this.updateCart([...currentItems, newItem]);
  }
}


  updateItemQuantity(item: CartItem): void {
    const currentItems = this.cartSubject.value;
    const index = currentItems.findIndex(i => i.id === item.id);

    if (index !== -1) {

      currentItems[index] = { ...item };
      this.updateCart([...currentItems]);
    }
  }


  removeItem(item: CartItem): void {
    const currentItems = this.cartSubject.value.filter(i => i.id !== item.id);
    this.updateCart(currentItems);
  }


  private updateCart(items: CartItem[]): void {
    this.cartSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }


  getCartValue(): CartItem[] {
    return this.cartSubject.value;
  }

// داخل CartServiceService
get overallTotal$(): Observable<number> {
  return this.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.total, 0))
  );
}



private searchTermSource = new BehaviorSubject<string>('');
currentSearchTerm$ = this.searchTermSource.asObservable();

updateSearchTerm(term: string) {
  this.searchTermSource.next(term);
}
}
