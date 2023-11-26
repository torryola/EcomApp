import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { CartItem } from 'src/app/common/cartItem';
import { Page } from 'src/app/common/page';
import { Product } from 'src/app/common/product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  private categoryId: number = 1;
  private previousCategory: number = 1;
  isSearching: boolean = false;
  searchKey!: string;
  // Set default values for Page props
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  page!: Page;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute, private cartservice: CartServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        params.keys.map(qParam => {
          switch (qParam) {
            case 'catId':
              let catId = +params.get('catId')!;
              this.categoryId = catId >= 1 ? catId : this.categoryId;
              this.getPagebleListOfProducts(this.categoryId, this.pageNumber, this.pageSize);
              break;
            case 'searchKey':
              this.isSearching = true;
              this.searchKey = params.get('searchKey')!
              this.searchForProducts(this.searchKey);
              break;
            default:
              // Show Error page or load default page - Fallback top default page
              this.getPagebleListOfProducts(this.categoryId, this.pageNumber, this.pageSize);
              break;
          }
        })
        return this.products;
      }
      )
    ).subscribe(
      data => {
        if (data == undefined || data == null) {
          console.log("====== Data is undefined ======")
          return this.products;
        }
        else
          return data
      }
    );

    // Default call when there is no routing
    // this.getPagebleListOfProducts(this.categoryId);
  }

  getPagebleListOfProducts(catId: number, pageNum: number = this.pageNumber, size: number = this.pageSize) {
    // Keep track of Cat ID
    if (this.previousCategory !== catId) {
      this.pageNumber = 0;
    }

    this.previousCategory = catId;

    this.productService.getPagebleProductList(catId, pageNum, size).subscribe(
      data =>this.processServiceResponce(data));
  }

  searchForProducts(key: string, pageNum: number = this.pageNumber, size: number = this.pageSize) {
    this.productService.searchPagebleProductList(key, pageNum, size).subscribe(data => this.processServiceResponce(data));
  }

  getNextPage() {
    // This method gets called on component load
    // Page number is 0 index from service, thus decrement it by 1 when calling service
    // i.e. when you click 2 in UI, the service will be 1
    this.pageNumber -= 1
    if(this.isSearching)
    this.searchForProducts(this.searchKey, this.pageNumber, this.pageSize)
  else{
    this.getPagebleListOfProducts(this.previousCategory)
  }

  }

  addItemToCart(product:Product) {
    // console.log(`Product added to Shopping cart ==== ${product.sku}`);
    // Call a helper method to add it to a cart e.g. CartService
    this.cartservice.addToCart(new CartItem(product));
  }

  updatePageSize(value: string) {
    this.pageNumber -= 1
    this.pageSize = +value
    this.getPagebleListOfProducts(this.categoryId, this.pageNumber, this.pageSize);
  }

  private processServiceResponce(data: any) {
    this.products = data._embedded.products;
    this.page = data.page;
    this.pageNumber = this.page.number + 1;
    this.pageSize = this.page.size;
    this.totalElements = this.page.totalElements

  }
}
