import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IBookings } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})

export class ReservasComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  reservas$: Observable<IBookings> = new Observable();

  reservas: IBookings;

  constructor(private store: Store) {
    this.reservas$ = this.store.select(WebState.bookings);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.reservas$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.reservas = resp;
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
