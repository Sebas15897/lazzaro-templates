import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { StoreClasicRoutingModule } from './store-clasic-routing.module';

@NgModule({
  declarations: [StoreComponent],
  imports: [CommonModule, StoreClasicRoutingModule],
})

export class StoreClasicModule {}
