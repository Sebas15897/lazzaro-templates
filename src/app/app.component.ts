import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, takeUntil } from 'rxjs';
import { LoadingState } from './core/store/loading/loading.state';
import { GetWebConfigction } from './core/store/web/web.actions';
import { IStyle } from './core/interfaces/web.interface';
import { WebState } from './core/store/web/web.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  showLoading$: Observable<boolean> = new Observable();
  getLoadingText$: Observable<string> = new Observable();
  appStyle$: Observable<IStyle> = new Observable();
  loadingText: string = '';

  constructor(
    private store: Store,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
    this.store.dispatch(new GetWebConfigction());
    this.showLoading$ = this.store.select(LoadingState.showLoading);
    this.getLoadingText$ = this.store.select(LoadingState.getTextLoading);
    this.appStyle$ = this.store.select(WebState.appStyle);
    this.subscribeState();
  }

  subscribeState() {
    this.showLoading$.pipe(takeUntil(this.destroy)).subscribe((show) => {
      show ? this.ngxSpinnerService.show() : this.ngxSpinnerService.hide();
    });

    this.getLoadingText$.pipe(takeUntil(this.destroy)).subscribe((text) => {
      if (text) {
        this.loadingText = text;
      } else {
        this.loadingText = '';
      }
    });

    this.appStyle$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        document.documentElement.style.setProperty('--dynamic-button-primary-color', resp?.buttonColor);
        document.documentElement.style.setProperty('--dynamic-button-hover-color', resp?.buttonColor);
        document.body.style.backgroundColor = resp?.menuColor;
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
