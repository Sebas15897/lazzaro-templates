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
    OurTeamComponent
  ],
  imports: [CommonModule, MinimalistRoutingModule],
})

export class LayoutMinimalistModule {}
