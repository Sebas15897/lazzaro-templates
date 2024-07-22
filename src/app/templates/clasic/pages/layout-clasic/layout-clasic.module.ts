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
import { PortafolioSelectedComponent } from './portafolio-clasic/portafolio-selected/portafolio-selected.component';
import { EventSelectedComponent } from './eventos-clasic/event-selected/event-selected.component';
import { ProductSelectedComponent } from './products-clasic/product-selected/product-selected.component';
import { StoreComponent } from './stores/store/store.component';
import { BlogComponent } from './blog/blog/blog.component';
import { ContactComponent } from './contact/contact/contact.component';

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
    PortafolioSelectedComponent,

    // Eventos
    EventSelectedComponent,

    // Productos
    ProductSelectedComponent,

    // tienda
    StoreComponent,

    // blog
    BlogComponent,

    // Contact
    ContactComponent
  ],
  imports: [CommonModule],
  exports: [LayoutClasicComponent]
})

export class LayoutClasicModule {}
