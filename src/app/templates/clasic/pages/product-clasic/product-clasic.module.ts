import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductSelectedComponent } from './product-selected.component';
import { ProductRoutingModule } from './product-clasic-routing.module';

@NgModule({
  declarations: [ProductSelectedComponent],
  imports: [CommonModule, ProductRoutingModule],
})

export class ProductClasicModule {}
