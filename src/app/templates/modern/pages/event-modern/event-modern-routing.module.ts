import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventModernComponent } from './event-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: EventModernComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EventModernRoutingModule {}
