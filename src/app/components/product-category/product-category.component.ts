import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories$?: Observable<ProductCategory[]>;

  constructor(private productCatService: ProductCategoryService){}

  ngOnInit(): void {
    this.productCategories$ = this.productCatService.getProductCategories();
  }

}
