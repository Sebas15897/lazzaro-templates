import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutClasicComponent } from './layout-clasic.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutClasicComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LayoutClasicComponent]
})

export class LayoutClasicModule {}
