import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeMinimalistRoutingModule } from './home-minimalist.routes.module';
import { HomeMinimalistComponent } from './home-minimalist.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EventosComponent } from './eventos/eventos.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ServicesComponent } from './services/services.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WeAreComponent } from './weAre/weAre.component';

@NgModule({
  declarations: [
    HomeMinimalistComponent,
    CarouselComponent,
    WeAreComponent,
    ServicesComponent,
    PortafolioComponent,
    StatisticsComponent,
    ReservasComponent,
    EventosComponent,
    OurTeamComponent,
  ],
  imports: [CommonModule, HomeMinimalistRoutingModule],
})

export class HomeMinimalistModule {}
