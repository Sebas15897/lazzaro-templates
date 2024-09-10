import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServiceClasicComponent } from './service-clasic.component';

export const routes: Routes = [
  {
    path: '',
    component: ServiceClasicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ServiceClasicRoutingModule {}
