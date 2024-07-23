import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventsMinimalistComponent } from './events-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: EventsMinimalistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EventsMinimalistRoutingModule {}
