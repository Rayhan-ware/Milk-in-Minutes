// order.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DairyProduct } from '../model/dairy-product.model';
import { ProductService } from '../services/product.service';
import { Order } from '../model/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from '../confirmation.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedProduct: DairyProduct | undefined;
  quantity: number = 1;
  totalPrice: number = 0;
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  customerAddress: string = '';
  customerDetailsForm: FormGroup;
  orderPlaced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService,  private snackBar: MatSnackBar) { 
    this.customerDetailsForm = new FormGroup({
      customerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      customerEmail: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]),
      customerPhone: new FormControl('', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]),
      customerAddress: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId !== null) {
      const parsedProductId = parseInt(productId, 10);
      if (!isNaN(parsedProductId)) {
        this.productService.getProductById(parsedProductId.toString()).subscribe((product: DairyProduct) => {
          this.selectedProduct = product;
          this.calculateTotalPrice();
        });
      }
    }
  }

  calculateTotalPrice(): void {
    if (this.selectedProduct) {
      this.totalPrice = (this.selectedProduct.price || 0) * this.quantity;
    }
  }

  placeOrder(): void {
    if (this.selectedProduct) {
      const order: Order = {
        productId: this.selectedProduct.id || 0,
        productName: this.selectedProduct.name || '',
        productCategory: this.selectedProduct.category || '',
        productPrice: this.selectedProduct.price || 0,
        productDescription: this.selectedProduct.description || '',
        quantity: this.quantity,
        totalPrice: this.totalPrice,
        customerName: this.customerName,
        customerEmail: this.customerEmail,
        customerPhone: this.customerPhone,
        customerAddress: this.customerAddress
      };

      this.productService.placeOrder(order).subscribe((response) => {
        console.log('Order Placed:', response);
        this.snackBar.open('Order placed successfully!', 'Close', {
          duration: 3000, // 3 seconds
          verticalPosition: 'top'
        });

         // Reset customer details form
      this.customerDetailsForm.reset();
      this.orderPlaced = true;

       // Redirect to landing page after 3 seconds
       setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);

      }, (error) => {
        console.error('Error placing order:', error);
        // Handle error scenario
        this.snackBar.open('Error placing order. Please try again later.', 'Close', {
          duration: 3000, // 3 seconds
          verticalPosition: 'top'
        });
      });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user has submitted the request
    // For example, you can show a confirmation dialog here
    if (this.orderPlaced) {
      return true; // Allow deactivation if order is placed
    }
    // Check if the user has filled the form
    return !this.customerDetailsForm.dirty || confirm('Are you sure you want to leave this page without placing the order?');
  }
}
