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

isSidebarOpen = false;

constructor(
  private apiService: ApiService,
  private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.loadBranches();
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

  this.cartService.setSelectedBranch(branch);

  this.isSidebarOpen = false;
  }

onSearch(event: any) {
  const value = event.target.value;
  this.cartService.updateSearchTerm(value);
}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}
