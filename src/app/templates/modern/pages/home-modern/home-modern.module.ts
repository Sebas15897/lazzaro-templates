import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModernRoutingModule } from './home-modern.routing.module';
import { HomeModernComponent } from './home-modern.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EventsComponent } from './events/events.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ServicesComponent } from './services/services.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WeAreComponent } from './weAre/weAre.component';

@NgModule({
  declarations: [
    HomeModernComponent,
    CarouselComponent,
    EventsComponent,
    OurTeamComponent,
    PortafolioComponent,
    ServicesComponent,
    StatisticsComponent,
    WeAreComponent,

  ],
  imports: [CommonModule, HomeModernRoutingModule],
})

export class HomeModernModule {}
