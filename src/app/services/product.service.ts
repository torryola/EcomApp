import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private searchBaseUrl = this.baseUrl+'/search'

  constructor(private httpClient: HttpClient) { }

  // Get All products
  getProductList(categoryId: number): Observable<Product[]> {
    const productByCategoryUrl = `${this.searchBaseUrl}/findByCategoryId?id=${categoryId}`;
   return this.httpClient.get<ServiceResponce>(productByCategoryUrl).pipe(
      map(res => res._embedded.products)
    );
  }

  searchProduct(searchKey: string): Observable<Product[]> {
    const searchProductUrl = `${this.searchBaseUrl}/findByDescriptionContaining?key=${searchKey}`
    return this.httpClient.get<ServiceResponce>(searchProductUrl).pipe(map(res => res._embedded.products))
  }
}

// Response Data Mapping
  interface ServiceResponce {
    _embedded: {
      products: Product[]
    }
  }
