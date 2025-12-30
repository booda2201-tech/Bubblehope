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

    // if (this.productService.lastSelectedCategory) {
    //   this.selectedCategory = this.productService.lastSelectedCategory;
    //   this.products = this.productService.lastFilteredProducts;
    // } else {
    //   this.selectCategory(this.categories[0]);
    // }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;

    this.allProductsInCategory =
      this.productService.getProductsByCategory(category);

    this.products = [...this.allProductsInCategory];

    if (this.products.length === 0) {
      this.message = 'No products found in this category';
    } else {
      this.message = '';
    }
  }

  filterProducts(term: string) {
    if (!term.trim()) {
      this.products = [...this.allProductsInCategory];
    } else {
      this.products = this.allProductsInCategory.filter((product) =>
        product.nameEn.toLowerCase().includes(term.toLowerCase())
      );
    }

    this.message =
      this.products.length === 0 ? 'No results matching your search' : '';
  }

  //   categories = [
  //     'Our Signature',
  //     'Ice Tea',
  //     'Matcha Classic',
  //     'Mojito',
  //     'Frappe & Smothie',
  //     'Milk Tea',
  //     'Iced Coffee',
  //     'Hot Coffee',
  //     'Dessert',
  //     'Waffle',
  //   ];

  //   ProductList = [
  //     {
  //       id: 1,
  //       nameEn: 'Our Signature',
  //       nameAr:'توقيعنا',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي', img:"./../../../assets/imeges/Menu1/evq3svz7pgbmzjav8ru8.png",price: 150 },
  //         { id: 2, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/hnejyxawq15mel879x6k.png",price: 200 },
  //         { id: 3, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/qkze33onboqouwdltiqm.png",price: 90 },
  //         { id: 4, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/smru3drgnhprpa3aqgfr.png",price: 150 },
  //         { id: 5, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/snkscyiej8cbatpvksbf.png",price: 120 },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       nameEn: 'Ice Tea',
  //       nameAr:'الشاي المحلي',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../../assets/imeges/Lava_files/bzaontenqvrgbxhiiian.png" ,price: 150 },
  //         { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../../assets/imeges/Lava_files/esowtpd6xanpe2m0g53q.png" ,price: 90 },
  //         { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava_files/j2rd1stfx7bvefipgcuu.png" ,price: 140 },
  //         { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava_files/jglqzxdne9t6nzxa8d0j.png" ,price: 140 },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       nameEn: 'Matcha Classic',
  //       nameAr:'الفطور',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../../assets/imeges/Lava 2_files/g2sotirbeyrxbgmxj5om.png" ,price: 150 },
  //         { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../../assets/imeges/Lava 2_files/m0a15ybbzp9bqtjbpmny.png" ,price: 110 },
  //         { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 2_files/sljoktlhmp4yu6kuign7.png" ,price: 130 },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       nameEn: 'Mojito',
  //       nameAr:'المشاي',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../../assets/imeges/Lava 3_files/m2ktwaapvhhicazppimj.png" ,price: 150 },
  //         { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../../assets/imeges/Lava 3_files/nebbbbmokgeg3j91gfg2.png" ,price: 120 },
  //         { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 3_files/nldxqosqjaqmd8n7pob8.png" ,price: 90 },
  //         { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 3_files/qc157e1jyaum46vbxdlq.png" ,price: 190 },
  //         { id: 5, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 3_files/xpvxzs44pw8ikxstkicf.png" ,price: 150 },
  //         { id: 6, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 3_files/zzaeprk574l24so1gyd3.png" ,price: 250 },
  //       ],
  //     },
  //       {
  //       id: 5,
  //       nameEn: 'Frappe & Smothie',
  //       nameAr:'الشاي المحلي',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../../assets/imeges/Chocolate_files/pn422gdkcev0yrtj58ub.png" ,price: 150 },
  //         { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../../assets/imeges/Chocolate_files/q0yl8hisklhujkvehiry.png" ,price: 180 },
  //         { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Chocolate_files/u66vbriqa2uepsvqi5hm.png" ,price: 150 },
  //         { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Chocolate_files/ykoak773yx9tfqvfhxe3.png" ,price: 140 },
  //       ],
  //     },
  //       {
  //       id: 6,
  //       nameEn: 'Milk Tea',
  //       nameAr:'الشاي المحلي',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../../assets/imeges/Boba_files/mmys3sbhrqcwaik1jutd.png" ,price: 150 },
  //         { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../../assets/imeges/Boba_files/pgwglxyij3zmptr8nqkr.png" ,price: 90 },
  //         { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Boba_files/rckqvsrklmte9sidyqhi.png" ,price: 140 },
  //         { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Boba_files/wbgqa3u5pikngkn7kcy6.png" ,price: 150 },
  //       ],
  //     },
  //         {
  //       id: 7,
  //       nameEn: 'Iced Coffee',
  //       nameAr:'المشاي',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../../assets/imeges/Lava 4_files/krrguvf2mp6mxenrfzzr.png" ,price: 150 },
  //         { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../../assets/imeges/Lava 4_files/p6ic2b31uvhdzxxp86cv.png" ,price: 120 },
  //         { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 4_files/ril1yiteyfhiyqgvdbcp.png" ,price: 90 },
  //         { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 4_files/ubp3tgh8nc5ij52ryp4c.png" ,price: 190 },
  //         { id: 5, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 4_files/ustdzzlx6oo4zpywnm2i.png" ,price: 150 },
  //         { id: 6, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../../assets/imeges/Lava 4_files/xjzclpxtugy5un31ubit.png" ,price: 250 },
  //       ],
  //     },
  //         {
  //       id: 8,
  //       nameEn: 'Hot Coffee',
  //       nameAr:'توقيعنا',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي', img:"./../../../assets/imeges/Lava 5_files/nni1gzbzqhsdwnovalhg.png",price: 150 },
  //         { id: 2, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Lava 5_files/oju8ewx1autp3v2t1x1h.png",price: 200 },
  //         { id: 3, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Lava 5_files/p0ujo60gqlv9tdu6msvy.png",price: 90 },
  //         { id: 4, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Lava 5_files/urks6zqq4k4oo9jqftax.png",price: 150 },
  //         { id: 5, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Lava 5_files/vmp2vxuqbeh9c66yiakz.png",price: 120 },
  //         { id: 6, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Lava 5_files/vnuoc5hypkeav8qwo43r.png",price: 120 },
  //       ],
  //     },
  //         {
  //       id: 8,
  //       nameEn: 'Dessert',
  //       nameAr:'توقيعنا',
  //       products: [
  //         { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي', img:"./../../../assets/imeges/Chocolate 2_files/adxovbwuwpo9xmxaxru9.png",price: 150 },
  //         { id: 2, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/azqtegmxmnbpgd1d2zv8.png",price: 200 },
  //         { id: 3, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/bgkpvbqkpc6gsaprxe6f.png",price: 90 },
  //         { id: 4, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/d9xfxuub6hhiqifjk71w.png",price: 200 },
  //         { id: 5, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/dqhcg40hmwj3cssurjpo.png",price: 120 },
  //         { id: 6, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/era8bbxzjrapniczkrd7.png",price: 150 },
  //         { id: 7, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/fhcoyht9y3mezuj4vh9u.png",price: 100 },
  //         { id: 8, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/h9asolct77fpw5cvtgnd.png",price: 120 },
  //         { id: 9, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/m6xdwagiauv7sukpf00z.png",price: 150 },
  //         { id: 10, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/noqx5ljbqtchk9iu4ykr.png",price: 220 },
  //         { id: 11, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/qq2zq3kfgphgyur3vo8u.png",price: 250 },
  //         { id: 12, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/rgbfc73xs44nyx7c0urj.png",price: 100 },
  //         { id: 13, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/t4pu3f8ktb265j0yglya.png",price: 90 },
  //         { id: 14, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/t7lhpghbwrbz2lworan9.png",price: 110 },
  //         { id: 15, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/ujkav5xnp2kzbwmlwxie.png",price: 130 },
  //         { id: 16, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/vpvnrsdjtr0v7jqwlm7m.png",price: 200 },
  //         { id: 17, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/wuugh4umoysr37m3klci.png",price: 120 },
  //         { id: 18, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/xgue1qyujnqin4qpjc7c.png",price: 160 },
  //         { id: 19, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/yxifkl9biszovlcqrzsh.png",price: 230 },
  //         { id: 20, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../../assets/imeges/Chocolate 2_files/z3gtivhei8v9pstgco9q.png",price: 180 },
  //       ],
  //     },
  //   ];

  // ngOnInit() {
  //   this.selectCategory(this.categories[0]);
  // }
  // selectCategory(category: string) {
  //   this.selectedCategory = category;

  //   const foundCategory = this.ProductList.find(
  //     (item) => item.nameEn === category
  //   );

  // if (foundCategory && foundCategory.products.length > 0) {
  //     this.products = foundCategory.products;
  //   } else {
  //     this.products = [];
  //     const translations = {
  //       ar: {
  //         noProducts: 'عذراً، لا توجد منتجات في هذا القسم'
  //       },
  //       en: {
  //         noProducts: 'Sorry, no products available in this category'
  //       }
  //     };
  //     this.message = this.currentLang === 'ar' ? translations.ar.noProducts : translations.en.noProducts;
  //   }
  // }
}
