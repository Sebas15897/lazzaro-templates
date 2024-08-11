import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogModernComponent } from './blog-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogModernComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BlogModernRoutingModule {}
