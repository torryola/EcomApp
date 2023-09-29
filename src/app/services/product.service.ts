import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  // Get All products
  getProductList(): Observable<Product[]> {
   return this.httpClient.get<ServiceResponce>(this.baseUrl).pipe(
      map(res => res._embedded.products)
    );
  }
}

// Response Data Mapping
  interface ServiceResponce {
    _embedded: {
      products: Product[]
    }
  }
