import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IEvent, IEventsSection } from '../../../../../core/interfaces/events.interface';
import { EventsState } from '../../../../../core/store/events/events.state';
import { SelectEventAction } from '../../../../../core/store/events/events.actions';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listEvents$: Observable<IEvent[]> = new Observable();
  sectionEvents$: Observable<IEventsSection> = new Observable();

  listEvents: IEvent[];
  sectionEvents: IEventsSection;

  constructor(private store: Store, private router: Router) {
    this.listEvents$ = this.store.select(EventsState.ListAllEvents);
    this.sectionEvents$ = this.store.select(EventsState.EventsSection);
  }
  swiperInstance: Swiper;


  ngOnInit() {
    this.subscribeState();
    this.initializeSwiper();
  }

  subscribeState() {
    this.listEvents$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listEvents = resp;
      this.initializeSwiper();
    });

    this.sectionEvents$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.sectionEvents = resp;
    });
  }

  onSelectEvent(event: IEvent) {
    this.store
      .dispatch(new SelectEventAction(event))
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.router.navigate(['/modern/events']);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  
  initializeSwiper() {
    this.swiperInstance = new Swiper('.swiper-container-modern-event', {
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


  slideNext() {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }

  slidePrev() {
    if (this.swiperInstance) {
      this.swiperInstance.slidePrev();
    }
  }
}
