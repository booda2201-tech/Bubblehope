import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ProductList = [
    {
      id: 1,
      categoryNameEn: 'Our Signature',
      categoryNameAr:'توقيعنا',
      products: [
        { id: 1, nameEn: 'Spanish Latte Boba',nameAr:'قهوه محلي', img:"./../../../assets/imeges/Menu1/evq3svz7pgbmzjav8ru8.png",price: 150 },
        { id: 2, nameEn: 'Mango Colada Boba', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/f02ugzsexxz6nfz3ydog.png",price: 200 },
        { id: 3, nameEn: 'Matcha Brown sugar latte boba', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/qkze33onboqouwdltiqm.png",price: 190 },
        { id: 4, nameEn: 'Chocolate Lava Boba', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/smru3drgnhprpa3aqgfr.png",price: 150 },
        { id: 5, nameEn: 'brown sugar latte boba', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/snkscyiej8cbatpvksbf.png",price: 120 },
        { id: 6, nameEn: 'brown sugar milk boba', nameAr:'شاي محلي', img:"./../../../assets/imeges/Menu1/dhba5q3vu1mjvchlre6j.png",price: 140 },
      ],
    },
    {
      id: 2,
      categoryNameEn: 'Ice Tea',
      categoryNameAr:'الشاي المحلي',
      products: [
        { id: 1, nameEn: 'Peach black Tea',nameAr:'قهوه محلي',img:"./../../assets/imeges/Menu2/bzaontenqvrgbxhiiian.png" ,price: 150 },
        { id: 2, nameEn: 'Lemon Green Tea',nameAr:'قهوه ساخن',img:"./../../assets/imeges/Menu2/esowtpd6xanpe2m0g53q.png" ,price: 90 },
        { id: 3, nameEn: 'Strawberry Black Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu2/j2rd1stfx7bvefipgcuu.png" ,price: 140 },
        { id: 4, nameEn: 'Mango Black tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu2/jglqzxdne9t6nzxa8d0j.png" ,price: 140 },
      ],
    },
    {
      id: 3,
      categoryNameEn: 'Matcha Classic',
      categoryNameAr:'الفطور',
      products: [
        { id: 1, nameEn: 'Matcha Strawberry Boba',nameAr:'قهوه محلي',img:"./../../assets/imeges/Menu3/g2sotirbeyrxbgmxj5om.png" ,price: 150 },
        { id: 2, nameEn: 'Mango Black tea',nameAr:'قهوه ساخن',img:"./../../assets/imeges/Menu3/m0a15ybbzp9bqtjbpmny.png" ,price: 110 },
        { id: 3, nameEn: 'Matcha Mango Boba',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu3/sljoktlhmp4yu6kuign7.png" ,price: 130 },
      ],
    },
    {
      id: 4,
      categoryNameEn: 'Mojito',
      categoryNameAr:'المشاي',
      products: [
        { id: 1, nameEn: 'Mango',nameAr:'قهوه محلي',img:"./../../assets/imeges/Menu4/m2ktwaapvhhicazppimj.png" ,price: 150 },
        { id: 2, nameEn: 'Hawaii Vibes',nameAr:'قهوه ساخن',img:"./../../assets/imeges/Menu4/nebbbbmokgeg3j91gfg2.png" ,price: 120 },
        { id: 3, nameEn: 'Papaya',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu4/nldxqosqjaqmd8n7pob8.png" ,price: 90 },
        { id: 4, nameEn: 'lychee',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu4/qc157e1jyaum46vbxdlq.png" ,price: 190 },
        { id: 5, nameEn: 'Mix Berries',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu4/xpvxzs44pw8ikxstkicf.png" ,price: 150 },
        { id: 6, nameEn: 'Green lemon',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu4/zzaeprk574l24so1gyd3.png" ,price: 250 },
      ],
    },
      {
      id: 5,
      categoryNameEn: 'Frappe & Smothie',
      categoryNameAr:'الشاي المحلي',
      products: [
        { id: 1, nameEn: 'Chocolate Frappe',nameAr:'قهوه محلي',img:"./../../assets/imeges/Menu5/pn422gdkcev0yrtj58ub.png" ,price: 150 },
        { id: 2, nameEn: 'Vanilla Frappe',nameAr:'قهوه ساخن',img:"./../../assets/imeges/Menu5/q0yl8hisklhujkvehiry.png" ,price: 180 },
        { id: 3, nameEn: 'Strawberry Vanilla Frappe',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu5/u66vbriqa2uepsvqi5hm.png" ,price: 150 },
        { id: 4, nameEn: 'Lotus Frappe',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu5/ykoak773yx9tfqvfhxe3.png" ,price: 140 },
      ],
    },
      {
      id: 6,
      categoryNameEn: 'Milk Tea',
      categoryNameAr:'الشاي المحلي',
      products: [
        { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../assets/imeges/Menu6/mmys3sbhrqcwaik1jutd.png" ,price: 150 },
        { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../assets/imeges/Menu6/pgwglxyij3zmptr8nqkr.png" ,price: 90 },
        { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu6/rckqvsrklmte9sidyqhi.png" ,price: 140 },
        { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu6/wbgqa3u5pikngkn7kcy6.png" ,price: 150 },
      ],
    },
        {
      id: 7,
      categoryNameEn: 'Iced Coffee',
      categoryNameAr:'المشاي',
      products: [
        { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي',img:"./../../assets/imeges/Menu7/krrguvf2mp6mxenrfzzr.png" ,price: 150 },
        { id: 2, nameEn: 'Hot Coffee',nameAr:'قهوه ساخن',img:"./../../assets/imeges/Menu7/p6ic2b31uvhdzxxp86cv.png" ,price: 120 },
        { id: 3, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu7/ril1yiteyfhiyqgvdbcp.png" ,price: 90 },
        { id: 4, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu7/ubp3tgh8nc5ij52ryp4c.png" ,price: 190 },
        { id: 5, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu7/ustdzzlx6oo4zpywnm2i.png" ,price: 150 },
        { id: 6, nameEn: 'Ice Tea',nameAr:'شاي محلي',img:"./../../assets/imeges/Menu7/xjzclpxtugy5un31ubit.png" ,price: 250 },
      ],
    },
        {
      id: 8,
      categoryNameEn: 'Hot Coffee',
      categoryNameAr:'توقيعنا',
      products: [
        { id: 1, nameEn: 'Iced Coffee',nameAr:'قهوه محلي', img:"./../../assets/imeges/Menu8/nni1gzbzqhsdwnovalhg.png",price: 150 },
        { id: 2, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu8/oju8ewx1autp3v2t1x1h.png",price: 200 },
        { id: 3, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu8/p0ujo60gqlv9tdu6msvy.png",price: 90 },
        { id: 4, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu8/urks6zqq4k4oo9jqftax.png",price: 150 },
        { id: 5, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu8/vmp2vxuqbeh9c66yiakz.png",price: 120 },
        { id: 6, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu8/vnuoc5hypkeav8qwo43r.png",price: 120 },
      ],
    },
        {
      id: 9,
      categoryNameEn: 'Dessert',
      categoryNameAr:'توقيعنا',
      products: [
        { id: 1, nameEn: 'Cookies Pistachio',nameAr:'قهوه محلي', img:"./../../assets/imeges/Menu9/adxovbwuwpo9xmxaxru9.png",price: 150 },
        { id: 2, nameEn: 'Crunchy Almond Tajine', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/azqtegmxmnbpgd1d2zv8.png",price: 200 },
        { id: 3, nameEn: 'Marble English Cake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/bgkpvbqkpc6gsaprxe6f.png",price: 90 },
        { id: 4, nameEn: 'Round Carrot Cake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/d9xfxuub6hhiqifjk71w.png",price: 200 },
        { id: 5, nameEn: 'Round Red Velvet Cake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/dqhcg40hmwj3cssurjpo.png",price: 120 },
        { id: 6, nameEn: 'Crunch Choco', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/era8bbxzjrapniczkrd7.png",price: 150 },
        { id: 7, nameEn: 'Ice Tea', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/fhcoyht9y3mezuj4vh9u.png",price: 100 },
        { id: 8, nameEn: 'Chocolate Muffins', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/h9asolct77fpw5cvtgnd.png",price: 120 },
        { id: 9, nameEn: 'Mini San SebastianCheesecake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/m6xdwagiauv7sukpf00z.png",price: 150 },
        { id: 10, nameEn: 'Tiramisu Cake Piece', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/noqx5ljbqtchk9iu4ykr.png",price: 220 },
        { id: 11, nameEn: 'Blueberry Crumble Cheesecake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/qq2zq3kfgphgyur3vo8u.png",price: 250 },
        { id: 12, nameEn: 'Plain Brownies', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/rgbfc73xs44nyx7c0urj.png",price: 100 },
        { id: 13, nameEn: 'Round Kinder Caramel cake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/t4pu3f8ktb265j0yglya.png",price: 90 },
        { id: 14, nameEn: 'Tiramisu Cake Piece', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/t7lhpghbwrbz2lworan9.png",price: 110 },
        { id: 15, nameEn: 'Chocolate Chips Cookies Large', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/ujkav5xnp2kzbwmlwxie.png",price: 130 },
        { id: 16, nameEn: 'Round Red Velvet Cake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/vpvnrsdjtr0v7jqwlm7m.png",price: 200 },
        { id: 17, nameEn: 'Double Chocolate Chips', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/wuugh4umoysr37m3klci.png",price: 120 },
        { id: 18, nameEn: 'Round Lemon Blueberry Cake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/xgue1qyujnqin4qpjc7c.png",price: 160 },
        { id: 19, nameEn: 'Nutella Crumble Cheesecake', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/yxifkl9biszovlcqrzsh.png",price: 230 },
        { id: 20, nameEn: 'Fudge Chocolate Piece', nameAr:'شاي محلي', img:"./../../assets/imeges/Menu9/z3gtivhei8v9pstgco9q.png",price: 180 },
      ],
    },
  ];



  getCategories() {
    return this.ProductList.map(cat => cat.categoryNameEn );
  }


getProduct(categoryName: string, productId: number) {

  const category = this.ProductList.find(c => c.categoryNameEn === categoryName);

  if (!category) {
    console.error('Category not found in Service:', categoryName);
    return null;
  }



  return category.products.find(p => p.id == productId) || null;
}


  getProductsByCategory(categoryName: string) {
    return this.ProductList.find(c => c.categoryNameEn === categoryName)?.products || [];
  }
}
