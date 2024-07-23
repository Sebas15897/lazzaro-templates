import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductSelectedComponent } from './product-selected.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductSelectedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductRoutingModule {}
