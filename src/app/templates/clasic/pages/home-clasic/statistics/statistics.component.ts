import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { WebState } from '../../../../../core/store/web/web.state';
import { IImpact } from '../../../../../core/interfaces/web.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})

export class StatisticsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  impactData$: Observable<IImpact> = new Observable();

  impactData: IImpact;

  constructor(private store: Store) {
    this.impactData$ = this.store.select(WebState.impactData);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.impactData$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.impactData = resp;
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
