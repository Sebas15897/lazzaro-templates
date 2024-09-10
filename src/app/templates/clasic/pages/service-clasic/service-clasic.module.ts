import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceClasicComponent } from './service-clasic.component';
import { ServiceClasicRoutingModule } from './service-clasic-routing.module';

@NgModule({
  declarations: [ServiceClasicComponent],
  imports: [
    CommonModule,
    ServiceClasicRoutingModule
  ]
})

export class ServiceClasicModule { }
