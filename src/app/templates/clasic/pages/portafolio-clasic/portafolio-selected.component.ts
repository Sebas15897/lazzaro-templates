import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IProject } from '../../../../core/interfaces/portfolio.iterface';
import { Store } from '@ngxs/store';
import { PortfolioState } from '../../../../core/store/portfolio/portfolio.state';
import { SelectProjectAction } from '../../../../core/store/portfolio/portfolio.actions';

@Component({
  selector: 'app-portafolio-selected',
  templateUrl: './portafolio-selected.component.html',
  styleUrls: ['./portafolio-selected.component.scss'],
})

export class PortafolioSelectedComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getProject$: Observable<IProject> = new Observable();

  project: IProject;

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

  ngOnDestroy() {
    this.store.dispatch(new SelectProjectAction(null));
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
