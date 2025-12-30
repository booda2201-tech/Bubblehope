import { Component, OnInit } from '@angular/core';
import { ProductService } from '.././../services/product.service';
import { CartServiceService } from '../cart.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  allProductsInCategory: any[] = [];
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  message: string = '';
  currentLang: string = 'en';

  constructor(
    private productService: ProductService,
    private cartService: CartServiceService
  ) {}

ngOnInit() {
  this.categories = this.productService.getCategories();

  if (this.productService.lastSelectedCategory) {
    this.selectedCategory = this.productService.lastSelectedCategory;
    this.allProductsInCategory = this.productService.getProductsByCategory(this.selectedCategory);


    this.products = this.productService.lastFilteredProducts.length > 0
      ? this.productService.lastFilteredProducts
      : [...this.allProductsInCategory];
  } else {
    this.selectCategory(this.categories[0]);
  }

  this.cartService.currentSearchTerm$.subscribe((term: string) => {
    this.filterProducts(term);
  });
}



selectCategory(category: string) {
  this.selectedCategory = category;
  this.allProductsInCategory = this.productService.getProductsByCategory(category);
  this.products = [...this.allProductsInCategory];


  this.productService.lastSelectedCategory = category;
  this.productService.lastFilteredProducts = this.products;

  this.message = this.products.length === 0 ? 'No products found' : '';
}

filterProducts(term: string) {
  if (!term.trim()) {
    this.products = [...this.allProductsInCategory];
  } else {
    const searchTerm = term.toLowerCase();
    const allProducts = this.productService.ProductList.flatMap(cat => cat.products);
      this.products = allProducts.filter((product) => {
      const nameToSearch = this.currentLang === 'en' ? product.nameEn : product.nameAr;
      return nameToSearch.toLowerCase().includes(searchTerm);
    });
  }

  this.productService.lastFilteredProducts = this.products;
  this.message = this.products.length === 0 ? 'No results matching your search' : '';
}

}
