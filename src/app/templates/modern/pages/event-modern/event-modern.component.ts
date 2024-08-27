import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IEvent } from '../../../../core/interfaces/events.interface';
import { SelectEventAction } from '../../../../core/store/events/events.actions';
import { EventsState } from '../../../../core/store/events/events.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuyEventComponent } from '../../../../shared/form-buy-event/form-buy-event.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-modern',
  templateUrl: './event-modern.component.html',
  styleUrls: ['./event-modern.component.scss'],
})
export class EventModernComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getListEvent$: Observable<IEvent[]> = new Observable();

  activeIndex = 0;

  eventId: string;
  event: IEvent;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.eventId = this.activatedRoute.snapshot.params['eventId'];
    this.getListEvent$ = this.store.select(EventsState.ListAllEvents);
  }

  ngOnInit() {
    this.subscribeState();
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  subscribeState() {
    this.getListEvent$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.event = resp.find((product) => product.id === this.eventId);
      }
    });
  }

  buyEvent() {
    this.dialog.open(FormBuyEventComponent, {
      width: '600px',
      data: this.event.id,
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
