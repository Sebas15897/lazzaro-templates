import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModernComponent } from './layout-modern.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RouterModule } from '@angular/router';
import { WeAreComponent } from '../home-modern/weAre/weAre.component';
import { StatisticsComponent } from '../home-modern/statistics/statistics.component';
import { ServicesComponent } from '../home-modern/services/services.component';
import { PortafolioComponent } from '../home-modern/portafolio/portafolio.component';
import { EventsComponent } from '../home-modern/events/events.component';
import { OurTeamComponent } from '../home-modern/our-team/our-team.component';

@NgModule({
  declarations: [
    LayoutModernComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    WeAreComponent,
    StatisticsComponent,
    ServicesComponent,
    PortafolioComponent,
    EventsComponent,
    OurTeamComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [LayoutModernComponent],
})

export class LayoutModernModule {}
