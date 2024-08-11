import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClasicRoutingModule } from './clasic.routing.module';
import { LayoutClasicModule } from './pages/layout-clasic/layout-clasic.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClasicRoutingModule,
    LayoutClasicModule,
    SharedModule,
  ],
})

export class ClasicModule {}
