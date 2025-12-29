import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import { MainComponent } from './components/layout/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmorderComponent } from './confirm-order/confirmorder.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'confirm-order', component: ConfirmorderComponent },
    ],
  },

  {  path: 'authentication',component: AuthenticationComponent,children: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
