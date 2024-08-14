import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IEvent, IEventsSection } from '../../../../../core/interfaces/events.interface';
import { SelectEventAction } from '../../../../../core/store/events/events.actions';
import { EventsState } from '../../../../../core/store/events/events.state';
import Swiper from 'swiper';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})

export class EventosComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listEvents$: Observable<IEvent[]> = new Observable();
  sectionEvents$: Observable<IEventsSection> = new Observable();

  listEvents: IEvent[];
  sectionEvents: IEventsSection;

  constructor(private store: Store, private router: Router) {
    this.listEvents$ = this.store.select(EventsState.ListAllEvents);
    this.sectionEvents$ = this.store.select(EventsState.EventsSection);
  }

  ngOnInit() {
    this.subscribeState();
    this.carrousel();
  }

  subscribeState() {
    this.listEvents$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listEvents = resp;
    });

    this.sectionEvents$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.sectionEvents = resp;
      this.carrousel();
    });
  }

  onSelectEvent(event: IEvent) {
    this.store
      .dispatch(new SelectEventAction(event))
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.router.navigate(['/minimalist/events']);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  swiperInstance: Swiper;

  carrousel(){
    this.swiperInstance = new Swiper('.swiper-container-e-minimalist', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.sliderNext',
        prevEl: '.sliderPrev'
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
