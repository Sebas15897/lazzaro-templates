import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeClasicComponent } from './home-clasic.component';
import { HomeClasicRoutingModule } from './home-clasic.routing.module';

@NgModule({
  declarations: [
    HomeClasicComponent,
  ],
  imports: [CommonModule, HomeClasicRoutingModule],
})

export class HomeClasicModule {}
