import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs';
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

    // this.activatedRoute.url.forEach(url => console.log("====== Route Url ======= "+url));

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
      {
        params.keys.map(qParam => {
          switch(qParam) {
            case 'catId' :
              let catId = +params.get('catId')!;
              this.categoryId = catId >= 1? catId : this.categoryId;
              this.getListOfProducts(this.categoryId);
              break;
            case 'searchKey':
              this.searchForProducts(params.get('searchKey')!);
              break;
            default:
              // Show Error page or load default page - Fallback top default page
              this.getListOfProducts(this.categoryId);
              break;
          }
        })

        // let catId = +params.get('catId')!;
        // this.categoryId = catId >= 1? catId : this.categoryId;
        //this.getListOfProducts(this.categoryId);
        return this.products;
      }
        )
    ).subscribe(
      data => {
        if(data == undefined || data == null){
        console.log("====== Data is undefined ======")
        return this.products;
        }
      else
      return data
      }
    );

    // Default call when there is no routing
    this.getListOfProducts(this.categoryId);
  }

  getListOfProducts(catId: number) {
    this.productService.getProductList(catId).subscribe(
      data => this.products = data
    );
  }

  searchForProducts(key: string){
    this.productService.searchProduct(key).subscribe(data => this.products = data);
  }
}
