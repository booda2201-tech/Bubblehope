import { Component } from '@angular/core';
import { CartServiceService } from '../cart.service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


constructor(private cartService: CartServiceService) {}

onSearch(event: any) {
  const value = event.target.value;
  this.cartService.updateSearchTerm(value);
}


}
