import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeMinimalistComponent } from './home-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeMinimalistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeMinimalistRoutingModule {}
