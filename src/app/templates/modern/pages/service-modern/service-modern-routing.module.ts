import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServiceModernComponent } from './service-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: ServiceModernComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ServiceModernRoutingModule {}
