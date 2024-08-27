import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { ITeam } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss'],
})

export class OurTeamComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy: Subject<boolean> = new Subject<boolean>();
  teamData$: Observable<ITeam> = new Observable();

  teamData: ITeam;
  swiperTeamClasic: Swiper;

  constructor(private store: Store) {
    this.teamData$ = this.store.select(WebState.teamData);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.teamData$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.teamData = resp;
    });
  }


  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }


  configTeam: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: true,
  };

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperTeamClasic = new Swiper('.swiper-container-two', this.configTeam);
    }, 600);
  }


  slideNextTeamClasic() {
    if (this.swiperTeamClasic) {
      this.swiperTeamClasic.slideNext();
    }
  }

  slidePrevTeamClasic() {
    if (this.swiperTeamClasic) {
      this.swiperTeamClasic.slidePrev();
    }
  }
}
