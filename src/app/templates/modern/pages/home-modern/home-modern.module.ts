import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModernRoutingModule } from './home-modern.routing.module';
import { HomeModernComponent } from './home-modern.component';

@NgModule({
  declarations: [HomeModernComponent],
  imports: [CommonModule, HomeModernRoutingModule],
})

export class HomeModernModule {}
