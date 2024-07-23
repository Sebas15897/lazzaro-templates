import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortafolioMinimalistRoutingModule } from './portafolio-minimalist-routing.module';
import { PortafolioMinimalistComponent } from './portafolio-minimalist.component';

@NgModule({
  declarations: [PortafolioMinimalistComponent],
  imports: [CommonModule, PortafolioMinimalistRoutingModule],
})

export class PortafolioMinimalistModule {}
