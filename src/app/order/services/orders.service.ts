import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url = 'https://angular-knwe.onrender.com/api/v1/products';

constructor(private http: HttpClient) { }

getProduct(productId: string): Observable<any> {
  return this.http.get<any>(`${this.url}/${productId}`);
}
}
