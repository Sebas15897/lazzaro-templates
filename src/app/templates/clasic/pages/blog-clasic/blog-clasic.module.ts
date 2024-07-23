import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { BlogClasicRoutingModule } from './blog-clasic-routing.module';

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogClasicRoutingModule],
})

export class BlogClasicModule {}
