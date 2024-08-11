import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModernRoutingModule } from './store-modern-routing.module';
import { StoreModernComponent } from './store-modern.component';


@NgModule({
  declarations: [StoreModernComponent],
  imports: [
    CommonModule,
    StoreModernRoutingModule
  ]
})

export class StoreModernModule { }
