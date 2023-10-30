import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomapp-ui';
 public static isProductDetails: boolean = false;

  constructor(private router: Router){
    // this.isProductDetails = router.url.includes('/products/details/*');
   // console.log(" Is Product Details Url ===== "+ this.router.url.includes('/products/details/*'));

  }

  public searchProduct(value: string): void {
    // redirect to product list
    this.router.navigateByUrl(`search/${value}`)
  }
}
