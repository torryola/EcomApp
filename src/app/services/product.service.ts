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
   return this.handleProductGetRequest(productByCategoryUrl);
  }


  getProductById(prodId: number): Observable<Product> {
   return this.httpClient.get<Product>(`${this.baseUrl}/${prodId}`).pipe(map(
    response => response
   ))
  }

  searchProduct(searchKey: string): Observable<Product[]> {
    const searchProductUrl = `${this.searchBaseUrl}/findByDescriptionContaining?key=${searchKey}`
    return this.handleProductGetRequest(searchProductUrl);
  }

  private handleProductGetRequest(url: string): Observable<Product[]> {
    return this.httpClient.get<ServiceResponce>(url).pipe(map(res => {
      let products = res._embedded.products;
      // Cache responce locally
      localStorage.setItem('products', JSON.stringify(products));
      return products;
    }))
  }
}

// Response Data Mapping
  interface ServiceResponce {
    _embedded: {
      products: Product[]
    }
  }
