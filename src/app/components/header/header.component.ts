import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '.././../services/product.service';
import { CartServiceService } from '../cart.service.service';
import { ApiService } from 'src/app/services/api.service';
import { BranchService } from 'src/app/services/branch.service';


interface category {
  id: number;
  name: string;
  name_ar: string;
  imageUrl: string;
  oldPrice?: number;
  newPrice?: number;
  price?: number;
  products: any[];
  categoryGroupId: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  allProductsInCategory: any[] = [];
  products: any[] = [];
  categories: category[] = [];
  selectedCategory: string = '';
  message: string = '';
  currentLang: string = 'en';
  branchId!: number ;

  constructor(
    private productService: ProductService,
    private cartService: CartServiceService,
    private apiService: ApiService,
    private branchService: BranchService
  ) {}

  // ngOnInit() {
  //   this.branchId = Number(localStorage.getItem('selectedBranchId')) ;


  //   this.apiService.getAllCategories().subscribe({
  //     next: (res: any) => {
  //       this.categories = res;
  //       // console.log(res);
  //     },
  //     error: (err) => {
  //       // console.log(err);
  //     },
  //   });

  //   if (this.productService.lastSelectedCategory) {
  //     this.selectedCategory = this.productService.lastSelectedCategory;
  //     this.allProductsInCategory = this.productService.getProductsByCategory(
  //       this.selectedCategory
  //     );

  //     this.products =
  //       this.productService.lastFilteredProducts.length > 0
  //         ? this.productService.lastFilteredProducts
  //         : [...this.allProductsInCategory];
  //   } else {
  //     this.selectCategory(this.categories[0].id);
  //   }

  //   this.cartService.currentSearchTerm$.subscribe((term: string) => {
  //     this.filterProducts(term);
  //   });

  // }

// ngOnInit() {

//   this.apiService.getAllCategories().subscribe({
//     next: (res: any) => {
//       this.categories = res;


//       this.branchService.currentBranchId$.subscribe((id: number) => {
//         this.branchId = id;

//         if (this.selectedCategory) {
//           this.getProductsByCategoryId(Number(this.selectedCategory));
//         }

//         else if (this.categories.length > 0) {
//           this.selectCategory(this.categories[0].id);
//         }
//       });
//     },
//     error: (err) => console.error('Error fetching categories', err)
//   });


//   this.cartService.currentSearchTerm$.subscribe((term: string) => {
//     this.filterProducts(term);
//   });
// }

private destroy$ = new Subject<void>();
ngOnInit() {

    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        this.initializeData();
      }
    });


    this.cartService.currentSearchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => this.filterProducts(term));
  }

  initializeData() {

    this.branchService.currentBranchId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => {
        this.branchId = id;


        if (this.selectedCategory) {
          this.getProductsByCategoryId(Number(this.selectedCategory));
        } else if (this.categories.length > 0) {

          this.selectCategory(this.categories[0].id);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

selectCategory(categoryId: number) {
  this.selectedCategory = categoryId.toString();
  this.getProductsByCategoryId(categoryId);
}

getProductsByCategoryId(categoryId: number) {
  if (!this.branchId) return;

  this.apiService.getAllProductsByBranchAndCtegory(categoryId, this.branchId).subscribe({
    next: (res: any) => {
      this.allProductsInCategory = res;
      this.products = [...res];
      this.message = this.products.length === 0 ? 'No products found' : '';
    },
    error: (err) => {
      this.products = [];
      this.message = 'Error loading products';
    }
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
