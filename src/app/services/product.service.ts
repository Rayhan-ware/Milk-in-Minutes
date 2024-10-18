// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DairyProduct } from '../model/dairy-product.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProductById(id: string): Observable<DairyProduct> {
    const url = `${this.apiUrl}/dairyProducts/${id}`;
    return this.http.get<DairyProduct>(url).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  placeOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/orders`;
    return this.http.post<Order>(url, order).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
