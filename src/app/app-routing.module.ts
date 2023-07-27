import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartPageComponent } from './pages/cartPage/cartPage.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "products",
    component: ProductListComponent
  },
  {
    path: "category/:categoryid",
    component: ProductListComponent
  },
  {
    path: "products/:productid",
    component: ProductDetailsComponent
  },
  {
    path: "cart",
    component: CartPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
