import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductMinimalistComponent } from './product-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductMinimalistComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductMinilitsRoutingModule {}
