import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IFooter, IStyle } from '../../core/interfaces/web.interface';
import { WebState } from '../../core/store/web/web.state';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})

export class TermsConditionsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  footer$: Observable<IFooter> = new Observable();
  styles$: Observable<IStyle> = new Observable();

  footer: IFooter;

  styles: IStyle;

  constructor(private store: Store) {
    this.footer$ = this.store.select(WebState.footer);
    this.styles$ = this.store.select(WebState.styleData);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.footer$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.footer = resp;
      } else {
        this.footer = null;
      }
    });

    this.styles$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.styles = resp;
      } else {
        this.styles = null;
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
