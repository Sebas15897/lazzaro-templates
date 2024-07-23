import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreMinimalistComponent } from './store-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: StoreMinimalistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StoreMinimalistRoutingModule {}
