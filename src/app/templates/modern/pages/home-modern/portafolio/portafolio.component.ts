import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IProject, IPortfolioSection } from '../../../../../core/interfaces/portfolio.iterface';
import { PortfolioState } from '../../../../../core/store/portfolio/portfolio.state';
import { SelectProjectAction } from '../../../../../core/store/portfolio/portfolio.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})

export class PortafolioComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listProjects$: Observable<IProject[]> = new Observable();
  sectionProjects$: Observable<IPortfolioSection> = new Observable();

  listProjects: IProject[];
  sectionProjects: IPortfolioSection;


  constructor(private store: Store, private router: Router) {
    this.listProjects$ = this.store.select(PortfolioState.ListAllProjects);
    this.sectionProjects$ = this.store.select(PortfolioState.PortfolioSection);
  }

  ngOnInit() {
    this.subscribeState();

  }

  subscribeState() {
    this.listProjects$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listProjects = resp;

    });

    this.sectionProjects$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.sectionProjects = resp;
    });
  }

  onSelectProject(project: IProject) {
    this.store
      .dispatch(new SelectProjectAction(project))
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.router.navigate(['/modern/portafolio']);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  
}

