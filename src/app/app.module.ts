import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CartstatusComponent } from './components/cartstatus/cartstatus.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  {path: 'shopping-cart', component: CartDetailsComponent},
{ path: 'category/:catId', component: ProductListComponent },
{path: 'search/:searchKey', component: ProductListComponent},
{ path: 'products/details/:id', component: ProductDetailsComponent },
{ path: 'products', component: ProductListComponent },
{ path: '', redirectTo: '/products', pathMatch: 'full'},
{ path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    ProductDetailsComponent,
    MainBannerComponent,
    CartstatusComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule, NgbToastModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
