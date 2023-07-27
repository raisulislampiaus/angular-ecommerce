import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Route } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartItemDetailed } from 'src/app/order/orders/model/cart';
import { CartService } from 'src/app/order/services/cart.service';
import { OrdersService } from 'src/app/order/services/orders.service';

@Component({
  selector: 'app-cartPage',
  templateUrl: './cartPage.component.html',
  styleUrls: ['./cartPage.component.css']
})
export class CartPageComponent implements OnInit,OnDestroy  {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  totalPrice: number = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this._getCartDetails();
    this._getOrderSummary();
  }
  ngOnDestroy() {

    this.endSubs$.complete();
  }


  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items?.length ?? 0;
      respCart?.items?.forEach((cartItem) => {
        if (typeof cartItem.productId === 'string') {
          this.ordersService.getProduct(cartItem.productId).subscribe((respProduct) => {
            this.cartItemsDetailed.push({
              product: respProduct,
              quantity: cartItem.quantity
            });

          });
        }
      });
    });
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event:any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart?.items) {
        cart.items.forEach((item) => {
          if (item.productId && item.quantity !== undefined && item.quantity > 0) {
            this.ordersService
              .getProduct(item.productId)
              .pipe(take(1))
              .subscribe((product) => {
                this.totalPrice += product.price * item.quantity!;
              });
          }
        });
      }
    });
  }









}
