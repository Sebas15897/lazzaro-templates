import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogModernComponent } from './blog-modern.component';
import { BlogModernRoutingModule } from './blog-modern.routing.module';


@NgModule({
  declarations: [BlogModernComponent],
  imports: [
    CommonModule,
    BlogModernRoutingModule
  ]
})

export class BlogModernModule { }
