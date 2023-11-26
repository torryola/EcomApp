import { Injectable } from '@angular/core';
import { CartItem } from '../common/cartItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  catItems: CartItem[] = [];

  // Publisher/Observable
  totalPricePublisher: Subject<number> = new Subject<number>;
  totalQuantityPublisher: Subject<number> = new Subject<number>;

  constructor() { }


  addToCart(cartItem:CartItem) {
    // console.log(`Product added to Shopping cart ==== ${cartItem.sku}`);
    // Before adding Item to the List, checkif it's already exists
    let tempItem = this.catItems.find(item => item.id === cartItem.id)

    // console.log(`TempItem current Quantity ==== ${tempItem?.quantity}`);
    // If already exists, increment the quantity
    if(tempItem == undefined)
    this.catItems.push(cartItem);
    else
    tempItem.quantity++;
  // Calcu;ate total qantity and Price
 this.updateTotalQuantityAndPrice();

  }

  private updateTotalQuantityAndPrice() {
    let totalQuantity:number = 0;
    let totalPrice:number = 0;

    this.catItems.map(item => {
      totalPrice += (item.quantity * item.unitPrice);
      totalQuantity += item.quantity;

      // Publish the total and quantity to subcribed component(s)
      this.totalPricePublisher.next(totalPrice);
      this.totalQuantityPublisher.next(totalQuantity);
    })

    // console.log(`Number of Items in the Cart === ${totalQuantity}  Price = ${totalPrice}`);
  }

}

