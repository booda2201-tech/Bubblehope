import { Component, OnInit } from '@angular/core';
import { ProductService } from '.././../services/product.service';
import { CartServiceService } from '../cart.service.service';
import { ApiService } from 'src/app/services/api.service';

interface category {
  id: number;
  name: string;
  name_ar: string;
  imageUrl: string;
  products: any[];
  categoryGroupId: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  allProductsInCategory: any[] = [];
  products: any[] = [];
  categories: category[] = [];
  selectedCategory: string = '';
  message: string = '';
  currentLang: string = 'en';

  constructor(
    private productService: ProductService,
    private cartService: CartServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.categories = this.productService.getCategories();

    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        // console.log(res);
      },
      error: (err) => {
        // console.log(err);
      },
    });

    if (this.productService.lastSelectedCategory) {
      this.selectedCategory = this.productService.lastSelectedCategory;
      this.allProductsInCategory = this.productService.getProductsByCategory(
        this.selectedCategory
      );

      this.products =
        this.productService.lastFilteredProducts.length > 0
          ? this.productService.lastFilteredProducts
          : [...this.allProductsInCategory];
    } else {
      this.selectCategory(this.categories[0].id);
    }

    this.cartService.currentSearchTerm$.subscribe((term: string) => {
      this.filterProducts(term);
    });
  }

  selectCategory(categoryId: number) {
    // this.selectedCategory = category;
    this.getProductsByCategoryId(categoryId);
    // this.productService.lastSelectedCategory = category;
    // this.productService.lastFilteredProducts = this.products;
  }

  getProductsByCategoryId(categoryId: number) {
    console.log(categoryId);

    this.apiService.getAllProductsByBranchAndCtegory(categoryId, 2).subscribe({
      next: (res: any) => {
        this.allProductsInCategory = res;
        this.products = [...this.allProductsInCategory];
        this.products = res;
        this.message = this.products.length === 0 ? 'No products found' : '';

        // console.log(res);
      },
      error: (err) => {
        // console.log(err);
        this.message = this.products.length === 0 ? 'No products found' : '';
      },
    });
  }
  filterProducts(term: string) {
    if (!term.trim()) {
      this.products = [...this.allProductsInCategory];
    } else {
      const searchTerm = term.toLowerCase();
      const allProducts = this.productService.ProductList.flatMap(
        (cat) => cat.products
      );
      this.products = allProducts.filter((product) => {
        const nameToSearch =
          this.currentLang === 'en' ? product.nameEn : product.nameAr;
        return nameToSearch.toLowerCase().includes(searchTerm);
      });
    }

    this.productService.lastFilteredProducts = this.products;
    this.message =
      this.products.length === 0 ? 'No results matching your search' : '';
  }
}
