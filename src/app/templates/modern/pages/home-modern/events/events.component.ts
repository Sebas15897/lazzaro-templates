import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import {
  IEvent,
  IEventsSection,
} from '../../../../../core/interfaces/events.interface';
import { EventsState } from '../../../../../core/store/events/events.state';
import { SelectEventAction } from '../../../../../core/store/events/events.actions';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listEvents$: Observable<IEvent[]> = new Observable();
  sectionEvents$: Observable<IEventsSection> = new Observable();

  listEvents: IEvent[];
  sectionEvents: IEventsSection;

  swiperInstance: Swiper;

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      700: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  constructor(
    private store: Store,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.listEvents$ = this.store.select(EventsState.ListAllEvents);
    this.sectionEvents$ = this.store.select(EventsState.EventsSection);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.listEvents$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listEvents = resp;
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
        this.router.navigate([`/modern/events/${event.id}`]);
      });
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperInstance = new Swiper(
        '.swiper-container-modern-event',
        this.config
      );
    }, 600);
  }

  slideNext() {
    if (this.swiperInstance) {
      this.swiperInstance?.slideNext();
    }
  }

  slidePrev() {
    if (this.swiperInstance) {
      this.swiperInstance?.slidePrev();
    }
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
