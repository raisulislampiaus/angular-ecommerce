import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Add the import for ActivatedRoute
import { Product } from 'src/app/models/products';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/order/services/cart.service';
import { CartItem } from 'src/app/order/orders/model/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  selectedProductIndex: number = 0;
  product: Product = {} as Product;

  endSubs$: Subject<any> = new Subject();

  constructor(
    private prodService: ProductsDataService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        // Access 'productid' using bracket notation
        this._getProduct(params['productid']); // Access 'productid' using bracket notation
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
        console.log(resProduct);
      });
  }

  quantity: number = 1; // Default quantity value

  increment() {
    if (this.quantity < 100) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  addProductToCart(id: any) {
    const cartItem: CartItem = {
      productId: id,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);
  }

  changeIndex(index:any) {
    this.selectedProductIndex = index;
  }
}
