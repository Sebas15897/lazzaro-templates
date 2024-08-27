import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectEventAction } from '../../../../core/store/events/events.actions';
import { EventsState } from '../../../../core/store/events/events.state';
import { IEvent } from '../../../../core/interfaces/events.interface';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormBuyEventComponent } from '../../../../shared/form-buy-event/form-buy-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-selected',
  templateUrl: './event-selected.component.html',
  styleUrls: ['./event-selected.component.scss'],
})

export class EventSelectedComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getListEvent$: Observable<IEvent[]> = new Observable();

  activeIndex = 0;

  eventId: string;
  event: IEvent;

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.eventId = this.activatedRoute.snapshot.params['eventId'];
    this.getListEvent$ = this.store.select(EventsState.ListAllEvents);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getListEvent$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.event = resp.find((product) => product.id === this.eventId);
      }
    });
  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  buyEvent() {
    this.dialog.open(FormBuyEventComponent, {
      width: '600px',
      data: this.event.id,
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new SelectEventAction(null));
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
