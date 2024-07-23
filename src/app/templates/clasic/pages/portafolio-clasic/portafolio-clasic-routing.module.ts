import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortafolioSelectedComponent } from './portafolio-selected.component';

export const routes: Routes = [
  {
    path: '',
    component: PortafolioSelectedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PortafolioRoutingModule {}
