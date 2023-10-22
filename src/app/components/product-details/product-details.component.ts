import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails?: Product;
  productCategory!: number;

  constructor(private productService: ProductService, private activatedRout: ActivatedRoute){
    AppComponent.isProductDetails = true;
  }
  ngOnInit(): void {

    let prodId = +this.activatedRout.snapshot.paramMap.get('id')!;
    this.getProductDetails(prodId)
  }

  getProductDetails(prodId: number) {
    // Check Local storage
    let cachedProd = localStorage.getItem(''+prodId);
    let cachedProduct: Product
   if (cachedProd === null) {
    let products: Product[] = JSON.parse(localStorage.getItem('products')!)
    cachedProduct = products[prodId];
   }
    else cachedProduct = JSON.parse(cachedProd);

   this.productDetails = cachedProduct !== undefined ? cachedProduct: this.fetchProductById(prodId);
   this.productCategory = this.getProductCatgeory(this.productDetails.sku);
   return this.productDetails
  }

  private fetchProductById(prodId: number): Product {
   this.productService.getProductById(prodId)
     .subscribe((prod: Product) => {
      // Cache it Locally
      localStorage.setItem(''+prodId, JSON.stringify(prod))
      this.productDetails = prod
    });
    return this.productDetails!
   }

   private getProductCatgeory(sku: string) {
    if(sku.startsWith('BOOK'))
    return 1;
  else if (sku.startsWith('COFFEEMUG')) {
    return 2;
  }
  else if (sku.startsWith('MOUSEPAD')) {
    return 3;
  }
  else if(sku.startsWith('LUGGAGETAG')) {
    return 4
  }
  else {
    return 1
  }
   }

}

