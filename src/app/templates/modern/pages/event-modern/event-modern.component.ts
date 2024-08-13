import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IEvent } from '../../../../core/interfaces/events.interface';
import { SelectEventAction } from '../../../../core/store/events/events.actions';
import { EventsState } from '../../../../core/store/events/events.state';

@Component({
  selector: 'app-event-modern',
  templateUrl: './event-modern.component.html',
  styleUrls: ['./event-modern.component.scss']
})

export class EventModernComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getEvent$: Observable<IEvent> = new Observable();

  activeIndex = 0;

  event: IEvent;

  constructor(private store: Store) {
    this.getEvent$ = this.store.select(EventsState.SelectEvent);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getEvent$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.event = resp;
    });
  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  ngOnDestroy() {
    this.store.dispatch(new SelectEventAction(null));
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
  }
