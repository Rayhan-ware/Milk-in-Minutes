import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DairyProduct } from '../model/dairy-product.model';
import { DairyProductService } from '../services/dairy-product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  dairyProducts: DairyProduct[] = [];
  searchText: string = ''; // Property for search text
  selectedCategory: string = ''; // Property for selected category
  categories: string[] = []; // Property for categories
  filteredProducts: DairyProduct[] = []; // Array to store unique categories

  constructor(private dairyProductService: DairyProductService, private router: Router) { }

  ngOnInit(): void {
    this.dairyProductService.getDairyProducts().subscribe(products => {
      this.dairyProducts = products;
      this.filteredProducts = products; // Display all products initially
      const categories = products.reduce((acc, product) => {
        if (product.category) {
          acc.push(product.category);
        }
        return acc;
      }, [] as string[]);
      this.categories = Array.from(new Set(categories)); // Remove duplicate categories
    });
  }
  

  selectProduct(product: DairyProduct): void {
    // Navigate to the order view, passing the selected product's ID as a parameter
    this.router.navigate(['/order', product.id]);
  }

  applyFilters(): void {
    // Filter products based on search text and selected category
    this.filteredProducts = this.dairyProducts.filter(product => {
      const nameMatch = product.name?.toLowerCase().includes(this.searchText.toLowerCase());
      const categoryMatch = this.selectedCategory ? product.category === this.selectedCategory : true;
      return nameMatch && categoryMatch;
    });
  }

  resetCategory(): void {
    // Reset the selected category to empty string to clear the filter
    this.selectedCategory = '';
    this.applyFilters(); // Apply filters after resetting the category
  }
}
