import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventSelectedComponent } from './event-selected.component';

export const routes: Routes = [
  {
    path: '',
    component: EventSelectedComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EventClasicRoutingModule {}