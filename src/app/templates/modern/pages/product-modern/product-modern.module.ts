import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModernRoutingModule } from './product-modern-routing.module';
import { ProductModernComponent } from './product-modern.component';

@NgModule({
  declarations: [ProductModernComponent],
  imports: [
    CommonModule,
    ProductModernRoutingModule
  ]
})

export class ProductModernModule { }
