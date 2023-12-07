import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService implements OnInit {

  private categoryBaseUrl = environment.BASE_URL+'product-category';
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

