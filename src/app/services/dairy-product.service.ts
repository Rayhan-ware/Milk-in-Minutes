// dairy-product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DairyProduct } from '../model/dairy-product.model';

@Injectable({
  providedIn: 'root'
})
export class DairyProductService {
  private apiUrl = 'http://localhost:3000/dairyProducts'; 

  constructor(private http: HttpClient) { }

  getDairyProducts(): Observable<DairyProduct[]> {
    return this.http.get<DairyProduct[]>(this.apiUrl);
  }
}
