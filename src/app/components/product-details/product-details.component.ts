import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '.././../services/product.service';
import { CartItem } from '../cart/cart-item.modeel';
import { CartServiceService } from '../cart.service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  categoryName: string = '';
  basePrice: number = 0;
  totalPrice: number = 0;
  mainprice: number = 0;


  notificationMessage: string = '';
  showNotification: boolean = false;

  extras = [
    { name: 'cream cheese', price: 20, selected: false },
    { name: 'cream cheese', price: 20, selected: false },
    { name: 'Extra syrup', price: 10, selected: false },
    { name: 'Extra syrup', price: 10, selected: false },
    { name: 'plain tapioca pearls', price: 15, selected: false },
    { name: 'plain tapioca pearls', price: 15, selected: false }
  ];

  sugarLevels = ['Full Sugar', 'Less Sugar', 'Normal'];
  iceLevels = ['100%', '50%', '0%'];

  selectedSugar = '';
  selectedIce = '';
  clicked = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService
  ) {}

  ngOnInit() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    const categoryName = this.route.snapshot.queryParamMap.get('category')!;

    this.categoryName = categoryName;

    this.product = this.productService.getProduct(this.categoryName, productId);

    if (this.product) {
      this.basePrice = this.product.price;
      this.totalPrice = this.product.price;
      this.mainprice = this.product.price;
    }
    else {
      console.error('Product not found !');
    }
  }

  selectIce(level: string) {
    this.selectedIce = level;
  }

  selectSugar(level: string) {
    this.selectedSugar = level;
  }

  toggleExtra(index: number) {
    this.extras[index].selected = !this.extras[index].selected;
    this.calculateTotal();
  }

  calculateTotal() {
    const extrasCost = this.extras
      .filter(e => e.selected)
      .reduce((sum, current) => sum + current.price, 0);

    this.totalPrice = this.basePrice + extrasCost;
  }

  isError: boolean = false;

addToCart(): void {
  this.clicked = true;
  if (!this.product) return;


  if (!this.selectedSugar || !this.selectedIce) {
    this.notificationMessage = 'Please select Sugar level and Ice level first! ⚠️';
    this.isError = true;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 2000);

    return;
  }

  const selectedExtras = this.extras.filter(e => e.selected);

  const itemToAdd: CartItem = {
    id: this.product.id,
    name: this.product.nameEn,
    price: this.basePrice,
    quantity: 1,
    total: this.totalPrice,
    image: this.product.img,
    extras: selectedExtras,
    sugarLevel: this.selectedSugar,
    iceLevel: this.selectedIce
  };


  this.cartService.addToCart(itemToAdd);

  this.notificationMessage = 'Product added to cart successfully ✅';
  this.isError = false;
  this.showNotification = true;

  setTimeout(() => { this.showNotification = false; }, 1200);
}

  // addToCart(): void {
  //   if (!this.product) return;

  //   const selectedExtras = this.extras.filter(e => e.selected);

  //   const uniqueId = `${this.product.id}-${this.selectedSugar}-${this.selectedIce}-${selectedExtras.map(e => e.name).join(',')}`;

  //   const itemToAdd: CartItem = {
  //     // cartItemId: `${this.product.id}-${this.selectedSugar}-${this.selectedIce}`,
  //     id: this.product.id,
  //     name: this.product.nameEn,
  //     price: this.basePrice,
  //     quantity: 1,
  //     total: this.totalPrice,
  //     image: this.product.img,
  //     extras: selectedExtras,
  //     sugarLevel: this.selectedSugar || 'Normal',
  //     iceLevel: this.selectedIce || '100%'
  //   };
  //   this.cartService.addToCart(itemToAdd);


  //   this.notificationMessage = 'Product added to cart successfully✅';
  //   this.showNotification = true;

  //   setTimeout(() => {
  //     this.showNotification = false;
  //     this.notificationMessage = '';
  //   }, 1200);
  // }

// product: any;
//   basePrice: number = 0;
//   totalPrice: number = 0;

//   extras = [
//     { name: 'cream cheese', price: 20, selected: false },
//     { name: 'Extra syrup', price: 10, selected: false },
//     { name: 'plain tapioca pearls', price: 15, selected: false }
//   ];

//   sugarLevels = ['Full Sugar', 'Less Sugar', 'Normal'];
//   iceLevels = ['100%', '50%', '0%'];

//   selectedSugar = '';
//   selectedIce = '';

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit() {

//     const productId = +this.route.snapshot.paramMap.get('id')!;
//     const categoryName = this.route.snapshot.queryParamMap.get('category')!;

//     console.log('ID from URL:', productId);
//     console.log('Category from URL:', categoryName);

//     this.product = this.productService.getProduct(categoryName, productId);

//     console.log('Product Found:', this.product);

//     if (this.product) {
//       this.basePrice = this.product.price;
//       this.totalPrice = this.product.price;
//     } else {
//       console.error('Product not found!');
//     }
//   }

//   selectIce(level: string) {
//     this.selectedIce = level;
//   }

//   selectSugar(level: string) {
//     this.selectedSugar = level;
//   }

//   toggleExtra(index: number) {
//     this.extras[index].selected = !this.extras[index].selected;
//     this.calculateTotal();
//   }

//   calculateTotal() {
//     const extrasCost = this.extras
//       .filter(e => e.selected)
//       .reduce((sum, current) => sum + current.price, 0);

//     this.totalPrice = this.basePrice + extrasCost;
//   }


// addToCart(): void {

//   const selectedExtras = this.extras.filter(e => e.selected);


//   const itemToAdd: CartItem = {
//     id: this.product.id,
//     name: this.product.name,
//     price: this.basePrice,
//     quantity: 1,
//     total: this.totalPrice,
//     image: this.product.image,
//     extras: selectedExtras,
//     sugarLevel: this.selectedSugar || 'Normal',
//     iceLevel: this.selectedIce || '100%'
//   };


//   this.cartService.addToCart(itemToAdd);


//   this.notificationMessage = `✅ تمت إضافة "${this.product.name}" إلى سلة التسوق!`;
//   this.showNotification = true;

//   setTimeout(() => {
//     this.showNotification = false;
//     this.notificationMessage = '';
//   }, 1200);
// }


//   extras = [
//     { name: 'cream cheese', price: 20, selected: false },
//     { name: 'Extra syrup', price: 10, selected: false },
//     { name: 'plain tapioca pearls', price: 15, selected: false }
//   ];

//     ProductList = [
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


// sugarLevels = ['Full Sugar', 'Less Sugar','Normal'];
// iceLevels = ['100%', '50%','0%'];

// selectedSugar = '';
// selectedIce = '';



//   ngOnInit() {
//     // 1. الحصول على الـ ID والـ Category من الرابط
//     const productId = +this.route.snapshot.paramMap.get('id')!;
//     const categoryName = this.route.snapshot.queryParamMap.get('category');

//     // 2. البحث عن المنتج في المصفوفة (بناءً على القسم والـ ID)
//     const category = ProductList.find(c => c.nameEn === categoryName);
//     if (category) {
//       this.product = category.products.find(p => p.id === productId);

//       if (this.product) {
//         this.basePrice = this.product.price;
//         this.totalPrice = this.product.price;
//       }
//     }
//   }


// selectIce(level: string) {
//   this.selectedIce = level;
// }
//   selectSugar(level: string) {
//     this.selectedSugar = level;
// }

//   toggleExtra(index: number) {
//     this.extras[index].selected = !this.extras[index].selected;
//     this.calculateTotal();
//   }

//   calculateTotal() {
//     const extrasCost = this.extras
//       .filter(e => e.selected)
//       .reduce((sum, current) => sum + current.price, 0);
//     this.totalPrice = this.basePrice + extrasCost;
//   }

}

