import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cartItem';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  subtotal: number = 0.00;
  total: number = 0.00;
  totalNumberOfItems: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.loadCartDetails();
  }

  private loadCartDetails() {
    // Get List of CartItems
    //console.log(`${JSON.stringify(this.cartService.catItems)}`);
    this.cartItems = this.cartService.catItems;

    this.cartItems.map(item => {
      this.total += +(item.quantity * item.unitPrice).toFixed(2);
      this.totalQuantity += item.quantity;
    });
    // #Todo Investigate why subcribe isn't receiving data here but works in cartStatus
  }

}
