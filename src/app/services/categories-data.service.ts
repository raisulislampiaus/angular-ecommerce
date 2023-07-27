import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {

  url = "https://angular-knwe.onrender.com/api/v1/categories";

  constructor(private http:HttpClient) { }
  getCategories(): Observable<Category[]>
  {
    return this.http.get<Category[]>(this.url);
  }
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${categoryId}`);
  }
}
