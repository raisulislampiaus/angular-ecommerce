import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from 'src/app/models/products';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/order/services/cart.service';
import { CartItem } from 'src/app/order/orders/model/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();
  constructor(
    private productData: ProductsDataService,
    private spinner: NgxSpinnerService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.products();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private products() {
    this.spinner.show();
    this.productData
      .products()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((productss) => {
        this.featuredProducts = productss;

        this.spinner.hide();
      });
  }

  addProductToCart(id: any) {
    //  console.log(id)
    const cartItem: CartItem = {
      productId: id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
  }
}
