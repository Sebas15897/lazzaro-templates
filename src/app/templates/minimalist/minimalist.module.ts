import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MinimalistRoutingModule } from './minimalist.routing.module';
import { LayoutMinimalistModule } from './pages/layout-minimalist/layout-minimalist.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MinimalistRoutingModule, LayoutMinimalistModule],
})

export class MinimalistModule {}
