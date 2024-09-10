import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServiceMinimalistComponent } from './service-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: ServiceMinimalistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ServiceMinimalistRoutingModule {}
