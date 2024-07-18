import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeClasicComponent } from './home-clasic.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeClasicComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeClasicRoutingModule {}
