import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductMinimalistComponent } from './product-minimalist.component';
import { ProductMinilitsRoutingModule } from './product-minimalist-routing.module';

@NgModule({
  declarations: [ProductMinimalistComponent],
  imports: [CommonModule, ProductMinilitsRoutingModule],
})

export class ProductMinimalistModule {}
