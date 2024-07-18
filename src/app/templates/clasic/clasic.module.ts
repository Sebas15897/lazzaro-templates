import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClasicRoutingModule } from './clasic.routing';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent
  ],
  imports: [CommonModule, ClasicRoutingModule],
})

export class ClasicModule {}
