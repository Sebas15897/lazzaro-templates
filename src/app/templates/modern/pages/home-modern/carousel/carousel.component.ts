import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IHomePage } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  homePageData$: Observable<IHomePage> = new Observable();

  homePage: IHomePage;

  constructor(private store: Store) {
    this.homePageData$ = this.store.select(WebState.homePageData);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.homePageData$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.homePage = resp;
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}

