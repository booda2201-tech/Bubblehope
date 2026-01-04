import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../components/cart/cart-item.modeel';
import { CartServiceService } from '../components/cart.service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.css']
})
export class ConfirmorderComponent implements OnInit{


    orderForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    paymentMethodId: new FormControl('0: 1', [Validators.required]),
    code: new FormControl('')
  });

    onSubmit() {
    // Handle form submission here
    console.log(this.orderForm.value);
  }

isButtonDisabled(): boolean {
    const cartItems = this.cartService.getCartValue();

    return this.orderForm.invalid || cartItems.length === 0;
  }


items$: Observable<CartItem[]>;
  overallTotal$: Observable<number>;

  constructor(private cartService: CartServiceService) {

    this.items$ = this.cartService.cart$;
    this.overallTotal$ = this.cartService.overallTotal$;
  }


  incrementQuantity(item: CartItem): void {
  item.quantity++;
  const unitPrice = item.total / (item.quantity - 1);
  item.total = unitPrice * item.quantity;

  this.cartService.updateItemQuantity(item);
}


  ngOnInit(): void {}


}
