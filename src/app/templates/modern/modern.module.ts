import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModernRoutingModule } from './modern.routing';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent
  ],
  imports: [CommonModule, ModernRoutingModule],
})

export class ModernModule {}
