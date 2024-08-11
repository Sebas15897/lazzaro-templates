import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortafolioModernRoutingModule } from './portafolio-modern-routing.module';
import { PortafolioModernComponent } from './portafolio-modern.component';


@NgModule({
  declarations: [PortafolioModernComponent],
  imports: [
    CommonModule,
    PortafolioModernRoutingModule
  ]
})

export class PortafolioModernModule { }
