import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  url = 'https://angular-knwe.onrender.com/api/v1/products';

  constructor(private http: HttpClient) {}
  products(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    return this.http.get<Product[]>(this.url, { params: params });
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}?query=${query}`);
  }
}
