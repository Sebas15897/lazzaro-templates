import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModernComponent } from './service-modern.component';
import { ServiceModernRoutingModule } from './service-modern-routing.module';



@NgModule({
  declarations: [ServiceModernComponent],
  imports: [
    CommonModule,
    ServiceModernRoutingModule
  ]
})

export class ServiceModernModule { }
