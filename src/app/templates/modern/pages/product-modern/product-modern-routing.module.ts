import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductModernComponent } from './product-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductModernComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductModernRoutingModule {}
