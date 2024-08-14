import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { ITeam } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';
import Swiper from 'swiper';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss'],
})

export class OurTeamComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  teamData$: Observable<ITeam> = new Observable();

  teamData: ITeam;
  swiperInstanceTeamModern: Swiper;

  constructor(private store: Store) {
    this.teamData$ = this.store.select(WebState.teamData);
  }

  ngOnInit() {
    this.subscribeState();
    this.initializeSwiperTeam();
  }

  subscribeState() {
    this.teamData$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.teamData = resp;
      this.initializeSwiperTeam();
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
  
  initializeSwiperTeam() {
    this.swiperInstanceTeamModern = new Swiper('.swiper-container-modern-team', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 3,
      spaceBetween: 10,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        700: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 20
        },
      }
    });
  }


  slideNextTeam() {
    if (this.swiperInstanceTeamModern) {
      this.swiperInstanceTeamModern.slideNext();
    }
  }

  slidePrevTeam() {
    if (this.swiperInstanceTeamModern) {
      this.swiperInstanceTeamModern.slidePrev();
    }
  }
}
