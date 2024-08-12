import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectEventAction } from '../../../../core/store/events/events.actions';
import { EventsState } from '../../../../core/store/events/events.state';
import { IEvent } from '../../../../core/interfaces/events.interface';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-event-selected',
  templateUrl: './event-selected.component.html',
  styleUrls: ['./event-selected.component.scss']
})

export class EventSelectedComponent implements OnInit, OnDestroy {
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
      console.log(resp);
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
