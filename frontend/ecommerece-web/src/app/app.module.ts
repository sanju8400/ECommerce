import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AppRoutingModule } from './app-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    OrderSummaryComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ManageProductsComponent,
    ManageCategoriesComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ProductService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
