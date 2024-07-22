import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutClasicComponent } from './layout-clasic.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { WeAreComponent } from './weAre/weAre.component';
import { ServicesComponent } from './services/services.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EventosComponent } from './eventos/eventos.component';
import { OurTeamComponent } from './ourTeam/our-team.component';
import { PortafolioSelectedComponent } from '../portafolio-clasic/portafolio-selected.component';
import { EventSelectedComponent } from '../event-clasic/event-selected.component';
import { ProductSelectedComponent } from '../product-clasic/product-selected.component';
import { StoreComponent } from '../store-clasic/store.component';
import { BlogComponent } from '../blog-clasic/blog.component';
import { ContactComponent } from '../contact-clasic/contact.component';

@NgModule({
  declarations: [
    LayoutClasicComponent,
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
    // PortafolioSelectedComponent,

    // Eventos
    // EventSelectedComponent,

    // Productos
    // ProductSelectedComponent,

    // tienda
    // StoreComponent,

    // blog
    // BlogComponent,

    // Contact
    // ContactComponent

  ],
  imports: [CommonModule],
  exports: [LayoutClasicComponent]
})

export class LayoutClasicModule {}
