import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IBookings } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})

export class ReservasComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  reservas$: Observable<IBookings> = new Observable();

  reservas: IBookings;

  isSmallScreen: boolean = false; 

  constructor(private store: Store, private  breakpointObserver: BreakpointObserver) {
    this.reservas$ = this.store.select(WebState.bookings);
  }

  ngOnInit() {
    this.subscribeState();
    this.test()
  }

  test(){
    this.breakpointObserver.observe(['(max-width: 700px)']).subscribe(result => {
      this.isSmallScreen = result.matches; // Si el media query coincide, isSmallScreen será true
      console.log(this.isSmallScreen);
    });
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
