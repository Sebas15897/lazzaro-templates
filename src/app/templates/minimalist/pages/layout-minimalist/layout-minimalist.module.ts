import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMinimalistComponent } from './layout-minimalist.component';
import { MinimalistRoutingModule } from '../../minimalist.routing.module';

@NgModule({
  declarations: [LayoutMinimalistComponent],
  imports: [CommonModule, MinimalistRoutingModule],
})

export class LayoutMinimalistModule {}
