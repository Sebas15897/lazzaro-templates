import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogMinimalistComponent } from './blog-minimalist.component';
import { BlogMinimalistRoutingModule } from './blog-minimalist-routing.module';

@NgModule({
  declarations: [BlogMinimalistComponent],
  imports: [CommonModule, BlogMinimalistRoutingModule],
})

export class BlogMinimalistModule {}
