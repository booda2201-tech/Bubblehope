import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart.service.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  branches: any[] = [];
  selectedBranchId: number | null = null;
  isSidebarOpen = false;
  isBranchesOpen: boolean = false;

constructor(
  private apiService: ApiService,
  private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.loadBranches();

    const savedBranchId = localStorage.getItem('selectedBranchId');
  if (savedBranchId) {

      this.selectedBranchId = +savedBranchId;
    }
  }

  loadBranches() {
      this.apiService.GetAllBranches().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: (err) => {
        console.error('Error fetching branches', err);
      }
    });
  }


  onBranchSelect(branch: any) {

  this.selectedBranchId = branch.id;
  this.apiService.changeBranch(branch.id.toString());
  this.isSidebarOpen = false;

  }

onSearch(event: any) {
  const value = event.target.value;
  this.cartService.updateSearchTerm(value);
}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;

  }

  toggleBranches(){
      this.isBranchesOpen = !this.isBranchesOpen;
  }

}
