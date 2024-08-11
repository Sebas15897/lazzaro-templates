import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, takeUntil } from 'rxjs';
import { LoadingState } from './core/store/loading/loading.state';
import { GetWebConfigction } from './core/store/web/web.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  showLoading$: Observable<boolean> = new Observable();
  getLoadingText$: Observable<string> = new Observable();
  loadingText: string = '';

  constructor(
    private store: Store,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
    this.store.dispatch(new GetWebConfigction());
    this.showLoading$ = this.store.select(LoadingState.showLoading);
    this.getLoadingText$ = this.store.select(LoadingState.getTextLoading);
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
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
