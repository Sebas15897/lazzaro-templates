import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeMinimalistRoutingModule } from './home-minimalist.routes.module';
import { HomeMinimalistComponent } from './home-minimalist.component';

@NgModule({
  declarations: [
    HomeMinimalistComponent,
  ],
  imports: [CommonModule, HomeMinimalistRoutingModule],
})

export class HomeMinimalistModule {}
