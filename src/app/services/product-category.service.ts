import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService implements OnInit {

  private categoryBaseUrl = 'http://localhost:8080/api/product-category';
  productCategories$?: Observable<ProductCategory[]>;


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
   this.productCategories$ = this.getProductCategories();
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<ProductCategoryResponse>(this.categoryBaseUrl)
    .pipe(
      map(res => res._embedded.productCategory)
    )
  }

}

interface ProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

