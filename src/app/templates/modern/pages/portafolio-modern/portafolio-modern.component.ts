import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IProject } from '../../../../core/interfaces/portfolio.iterface';
import { SelectProjectAction } from '../../../../core/store/portfolio/portfolio.actions';
import { PortfolioState } from '../../../../core/store/portfolio/portfolio.state';

@Component({
  selector: 'app-portafolio-modern',
  templateUrl: './portafolio-modern.component.html',
  styleUrls: ['./portafolio-modern.component.scss']
})

export class PortafolioModernComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getProject$: Observable<IProject> = new Observable();

  project: IProject;

  activeIndex = 0;

  constructor(private store: Store) {
    this.getProject$ = this.store.select(PortfolioState.SelectedProject);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getProject$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      console.log(resp);
      this.project = resp;
    });
  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  ngOnDestroy() {
    this.store.dispatch(new SelectProjectAction(null));
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
