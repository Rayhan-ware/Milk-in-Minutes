import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-dairy-products-requests',
  templateUrl: './dairy-products-requests.component.html',
  styleUrls: ['./dairy-products-requests.component.css']
})
export class DairyProductsRequestsComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = [
    'id',
    'productName',
    'productCategory',
    'productPrice',
    'quantity',
    'totalPrice',
    'customerName',
    'customerEmail',
    'customerPhone',
    'customerAddress'
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Fetch orders from the service
    this.productService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
