import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  private categoryId: number = 1;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
      {
        let catId = +params.get('catId')!;
        this.categoryId = catId >= 1? catId : 1 ;
        this.getListOfProducts(this.categoryId);
        return this.products;
      }
        )
    ).subscribe(
      data => data
    );

    // this.getListOfProducts();
  }

  getListOfProducts(catId: number) {
    this.productService.getProductList(catId).subscribe(
      data => this.products = data
    );
  }
}
