import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMinimalistComponent } from './layout-minimalist.component';
import { MinimalistRoutingModule } from '../../minimalist.routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PortafolioMinimalistComponent } from '../portafolio-minimalist/portafolio-minimalist.component';
import { ProductMinimalistComponent } from '../product-minimalist/product-minimalist.component';
import { EventsMinimalistComponent } from '../events-minimalist/events-minimalist.component';
import { StoreMinimalistComponent } from '../store-minimalist/store-minimalist.component';
import { BlogMinimalistComponent } from '../blog-minimalist/blog-minimalist.component';

@NgModule({
  declarations: [
    LayoutMinimalistComponent,
    HeaderComponent,
    FooterComponent,

/*     PortafolioMinimalistComponent,

    ProductMinimalistComponent,

    EventsMinimalistComponent,

    StoreMinimalistComponent,
 */
/*     BlogMinimalistComponent, */

  ],
  imports: [CommonModule, MinimalistRoutingModule],
})

export class LayoutMinimalistModule {}
