import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortafolioModernComponent } from './portafolio-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: PortafolioModernComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PortafolioModernRoutingModule {}
