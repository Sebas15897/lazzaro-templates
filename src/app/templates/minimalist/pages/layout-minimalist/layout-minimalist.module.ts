import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMinimalistComponent } from './layout-minimalist.component';
import { MinimalistRoutingModule } from '../../minimalist.routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { WeAreComponent } from './weAre/weAre.component';
import { ServicesComponent } from './services/services.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EventosComponent } from './eventos/eventos.component';
import { OurTeamComponent } from './our-team/our-team.component';
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
    CarouselComponent,
    WeAreComponent,
    ServicesComponent,
    PortafolioComponent,
    StatisticsComponent,
    ReservasComponent,
    EventosComponent,
    OurTeamComponent,

    // portafolio
    PortafolioMinimalistComponent,

    // productos
    ProductMinimalistComponent,

    // eventos
    EventsMinimalistComponent,

    // tienda
    StoreMinimalistComponent,

    // blog
    BlogMinimalistComponent,

  ],
  imports: [CommonModule, MinimalistRoutingModule],
})

export class LayoutMinimalistModule {}
