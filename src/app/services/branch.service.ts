import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private initialBranchId = localStorage.getItem('selectedBranchId')
                        ? Number(localStorage.getItem('selectedBranchId'))
                          : 0;

  private branchSource = new BehaviorSubject<number>(this.initialBranchId);


  currentBranchId$ = this.branchSource.asObservable();

  constructor() {}


  updateBranchId(id: number) {
    localStorage.setItem('selectedBranchId', id.toString());
    this.branchSource.next(id); 
  }
}
