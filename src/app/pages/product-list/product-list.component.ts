import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/products';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoriesDataService } from 'src/app/services/categories-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/order/orders/model/cart';
import { CartService } from 'src/app/order/services/cart.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  details: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean = false;
  endSubs$: Subject<any> = new Subject();
  constructor(
    private detailsData: ProductsDataService,
    private categoriesService: CategoriesDataService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private cartService: CartService,

  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   if (params['categoryid']) {
    //     this.products([params['categoryid']]);
    //     this.isCategoryPage = true;
    //   } else {
    //     this.products();
    //     this.isCategoryPage = false;
    //   }
    // });
    // // this.products();
    // this.categoriess();

    this.route.params.subscribe((params) => {
      params['categoryid'] ? this.products([params['categoryid']]) : this.products();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this.categoriess();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private products(categoriesFilter?: string[]) {
    this.spinner.show();
    this.detailsData
      .products(categoriesFilter)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((productss) => {
        this.details = productss;
        this.spinner.hide();
      });
  }
  private categoriess() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter(
        (
          c
        ): c is typeof c & {
          checked: true;
          id: string;
        } => Boolean(c.checked && c.id)
      )
      .map(({ id }) => id);
    this.products(selectedCategories);
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
