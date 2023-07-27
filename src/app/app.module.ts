import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './components/header/header.component';
import { HomePageModule } from './pages/homePage/homePage.module';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrdersModule } from './order/orders/orders.module';
import { CartPageComponent } from './pages/cartPage/cartPage.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';






@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    ProductListComponent,
    CartPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    OrdersModule,
    MatSlideToggleModule,

  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
