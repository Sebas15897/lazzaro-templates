import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModernComponent } from './layout-modern.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutModernComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LayoutModernComponent],
})

export class LayoutModernModule {}