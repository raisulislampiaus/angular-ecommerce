import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/order/services/cart.service';
import { ProductsDataService } from 'src/app/services/products-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchResults: Product[] = [];
  searchQuery: string ='';
  cartCount = 0;
  constructor(private cartService: CartService,private productSearchService: ProductsDataService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
  }

  search(): void { // The search method doesn't need the query parameter anymore
    this.productSearchService.searchProducts(this.searchQuery).subscribe(
      (results) => {
        this.searchResults = results;
        console.log(results)
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

}
