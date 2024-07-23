import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeClasicComponent } from './home-clasic.component';
import { HomeClasicRoutingModule } from './home-clasic.routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { OurTeamComponent } from './ourTeam/our-team.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ServicesComponent } from './services/services.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WeAreComponent } from './weAre/weAre.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    HomeClasicComponent,
    EventosComponent,
    OurTeamComponent,
    PortafolioComponent,
    ReservasComponent,
    ServicesComponent,
    StatisticsComponent,
    WeAreComponent,
    CarouselComponent,
  ],
  imports: [CommonModule, HomeClasicRoutingModule],
})

export class HomeClasicModule {}
