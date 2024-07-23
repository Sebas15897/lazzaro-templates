import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogMinimalistComponent } from './blog-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogMinimalistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BlogMinimalistRoutingModule {}
