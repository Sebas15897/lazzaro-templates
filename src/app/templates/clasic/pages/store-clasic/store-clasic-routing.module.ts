import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';

export const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StoreClasicRoutingModule {}
