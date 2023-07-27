import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { CartService } from '../services/cart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule {

  constructor(cartService: CartService){
    cartService.initCartLocalStorage();
  }
}
