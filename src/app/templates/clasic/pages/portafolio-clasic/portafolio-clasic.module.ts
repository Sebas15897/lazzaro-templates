import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortafolioSelectedComponent } from './portafolio-selected.component';
import { PortafolioRoutingModule } from './portafolio-clasic-routing.module';

@NgModule({
  declarations: [PortafolioSelectedComponent],
  imports: [CommonModule, PortafolioRoutingModule],
})

export class PortafolioModule {}
