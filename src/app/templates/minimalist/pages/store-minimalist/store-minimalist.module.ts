import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreMinimalistRoutingModule } from './store-minimalist-routing.module';
import { StoreMinimalistComponent } from './store-minimalist.component';

@NgModule({
  declarations: [StoreMinimalistComponent],
  imports: [CommonModule, StoreMinimalistRoutingModule],
})

export class StoreMinimalistModule {}
