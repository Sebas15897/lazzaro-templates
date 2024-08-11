import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModernRoutingModule } from './modern.routing.module';
import { LayoutModernModule } from './pages/layout-modern/layout-modern.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModernRoutingModule,
    LayoutModernModule,
    SharedModule,
  ],
})

export class ModernModule {}
