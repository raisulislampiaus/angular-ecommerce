import { Injectable } from '@angular/core';

import { Cart, CartItem } from '../orders/model/cart';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: [],
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, intialCartJson);
    }
  }

  emptyCart() {
    const intialCart = {
      items: [],
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }

  // getCart(): Cart {
  //   const cartJsonString: string | null = localStorage.getItem(CART_KEY);
  //   const cart: Cart = JSON.parse(cartJsonString!); // Use non-null assertion here
  //   return cart;
  // }
  getCart(): Cart {
    const cartJsonString: string | null = localStorage.getItem(CART_KEY);
    const cart: Cart = cartJsonString ? JSON.parse(cartJsonString) : { items: [] };
    return cart;
  }


  // setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
  //   const cart = this.getCart();
  //   const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);

  //   if (cartItemExist) {
  //     cart.items?.forEach((item) => {
  //       if (item.productId === cartItem.productId) {
  //         if (updateCartItem) {
  //           item.quantity = cartItem.quantity !== undefined ? cartItem.quantity : 0;
  //         } else {
  //           item.quantity = (item.quantity !== undefined ? item.quantity : 0) + (cartItem.quantity !== undefined ? cartItem.quantity : 0);
  //         }
  //       }
  //     });
  //   } else {
  //     if (!cart.items) {
  //       cart.items = []; // Initialize items array if it doesn't exist
  //     }
  //     cart.items.push(cartItem);
  //   }

  //   const cartJson = JSON.stringify(cart);
  //   localStorage.setItem(CART_KEY, cartJson);
  //   this.cart$.next(cart);
  //   return cart;
  // }
  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);

    if (cartItemExist) {
      cart.items = cart.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            return { ...item, quantity: cartItem.quantity !== undefined ? cartItem.quantity : 0 };
          } else {
            const quantity = (item.quantity !== undefined ? item.quantity : 0) + (cartItem.quantity !== undefined ? cartItem.quantity : 0);
            return { ...item, quantity };
          }
        }
        return item;
      });
    } else {
      if (!cart.items) {
        cart.items = [];
      }
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }



  deleteCartItem(productId: string) {
    const cart = this.getCart();
    if (cart.items) {
      const newCart = cart.items.filter((item) => item.productId !== productId);
      cart.items = newCart;
    }

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }

}
