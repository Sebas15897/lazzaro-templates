import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BlogClasicRoutingModule {}
