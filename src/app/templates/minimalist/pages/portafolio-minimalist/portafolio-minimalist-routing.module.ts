import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortafolioMinimalistComponent } from './portafolio-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: PortafolioMinimalistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PortafolioMinimalistRoutingModule {}
