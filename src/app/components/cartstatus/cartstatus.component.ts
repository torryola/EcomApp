import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cartstatus',
  templateUrl: './cartstatus.component.html',
  styleUrls: ['./cartstatus.component.css']
})
export class CartstatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  updateCart() {
    this.cartService.totalPricePublisher.subscribe(value => {this.totalPrice = +value.toFixed(2)});
    this.cartService.totalQuantityPublisher.subscribe(value => this.totalQuantity = value);
  }

  ngOnDestroy(): void {
    this.cartService.totalPricePublisher?.unsubscribe();
    this.cartService.totalQuantityPublisher?.unsubscribe();
  }

}
