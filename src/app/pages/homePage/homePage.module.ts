import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './homePage.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  imports: [CommonModule, AppRoutingModule,  MatGridListModule,],
  declarations: [
    HomePageComponent,
    BannerComponent,
    CategoriesComponent,
    ProductsComponent,
    FooterComponent,
    ProductDetailsComponent,
  ],
})
export class HomePageModule {}
