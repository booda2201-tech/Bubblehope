import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item.modeel';
import { CartServiceService } from '../cart.service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;
  overallTotal$: Observable<number>;

  constructor(private cartService: CartServiceService) {

    this.items$ = this.cartService.cart$;



this.overallTotal$ = this.cartService.cart$.pipe(
  map(items => items.reduce((sum, item) => {

    return sum + (item.total || 0);
  }, 0))
);


  }

  ngOnInit(): void {}


incrementQuantity(item: CartItem): void {
  item.quantity++;
  item.total = item.price * item.quantity;


  this.cartService.updateItemQuantity(item);
}

formatOptionValue(value: any): string {
  if (Array.isArray(value)) {
    // إذا كانت إضافات متعددة نجمع أسمائها بفاصلة
    return value.map(opt => opt.name).join(' + ');
  }
  // إذا كان خيار واحد (مثل الحجم) نرجع الاسم مباشرة
  return value.name || value;
}

decrementQuantity(item: CartItem): void {
  if (item.quantity > 1) {
    item.quantity--;
    item.total = item.price * item.quantity;
    this.cartService.updateItemQuantity(item);
  }
}

  removeItem(item: CartItem): void {
    if (confirm(`حذف ${item.name} من السلة؟`)) {
      this.cartService.removeItem(item);
    }
  }
}
