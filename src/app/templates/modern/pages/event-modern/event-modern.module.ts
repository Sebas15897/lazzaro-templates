import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModernRoutingModule } from './event-modern-routing.module';
import { EventModernComponent } from './event-modern.component';


@NgModule({
  declarations: [EventModernComponent],
  imports: [
    CommonModule,
    EventModernRoutingModule
  ]
})

export class EventModernModule { }
