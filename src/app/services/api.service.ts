import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://alhendalcompany-001-site1.stempurl.com/api/';
  constructor(private http:HttpClient) { }

  getAllProductsByBranchAndCtegory(categoryId:number,branchId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}Products/GetProductsByCategoryId/${categoryId}/branch/${branchId}`)
    // return this.http.get(`https://alhendalcompany-001-site1.stempurl.com/api/Products/GetProductsByCategoryId/1/branch/2`)
  }


  getAllCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}Categories/GetAllCategories?categoryGroupId=1`)
  }
  GetProductById(productId:number, branchId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}Products/GetProductById?id=${productId}&branchId=${branchId}`)
  }
  GetAllBranches():Observable<any>{
    return this.http.get(`${this.baseUrl}Branch/GetAllBranches`)
  }
  GetBranch():Observable<any>{
    return this.http.get(`${this.baseUrl}Branch/Switch`)
  }






}



// /api/Products/GetProductById?id=1&branchId=2&userId=string
// /api/Branch/GetAllBranches
