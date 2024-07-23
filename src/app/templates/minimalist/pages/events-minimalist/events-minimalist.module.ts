import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventsMinimalistComponent } from './events-minimalist.component';
import { EventsMinimalistRoutingModule } from './events-minimalist-routing.module';

@NgModule({
  declarations: [EventsMinimalistComponent],
  imports: [CommonModule, EventsMinimalistRoutingModule],
})

export class EventsMinimalistModule {}
