import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IAboutUs, IWhyChooseUs } from 'src/app/core/interfaces/web.interface';
import { WebState } from 'src/app/core/store/web/web.state';

@Component({
  selector: 'app-weAre',
  templateUrl: './weAre.component.html',
  styleUrls: ['./weAre.component.scss']
})

export class WeAreComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  aboutUs$: Observable<IAboutUs> = new Observable();
  whyChooseUsData$: Observable<IWhyChooseUs> = new Observable();

  aboutUs: IAboutUs;
  whyChooseUsData: IWhyChooseUs;

  constructor(private store: Store) {
    this.aboutUs$ = this.store.select(WebState.aboutUsData);
    this.whyChooseUsData$ = this.store.select(WebState.whyChooseUsData);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.aboutUs$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.aboutUs = resp;
    });

    this.whyChooseUsData$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.whyChooseUsData = resp;
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}

