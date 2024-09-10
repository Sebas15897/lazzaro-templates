import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceMinimalistComponent } from './service-minimalist.component';
import { ServiceMinimalistRoutingModule } from './service-minimalist-routing.module';

@NgModule({
  declarations: [ServiceMinimalistComponent],
  imports: [
    CommonModule,
    ServiceMinimalistRoutingModule,
  ]
})

export class ServiceMinimalistModule { }
