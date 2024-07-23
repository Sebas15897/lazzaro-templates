import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventSelectedComponent } from './event-selected.component';
import { EventClasicRoutingModule } from './event-clasic-routing.module';

@NgModule({
  declarations: [EventSelectedComponent],
  imports: [CommonModule, EventClasicRoutingModule],
})

export class EventClasicModule {}
