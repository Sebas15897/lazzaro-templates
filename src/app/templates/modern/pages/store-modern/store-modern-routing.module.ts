import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModernComponent } from './store-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: StoreModernComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StoreModernRoutingModule {}
