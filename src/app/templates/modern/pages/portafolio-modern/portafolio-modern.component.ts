import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IProject } from '../../../../core/interfaces/portfolio.iterface';
import { SelectProjectAction } from '../../../../core/store/portfolio/portfolio.actions';
import { PortfolioState } from '../../../../core/store/portfolio/portfolio.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portafolio-modern',
  templateUrl: './portafolio-modern.component.html',
  styleUrls: ['./portafolio-modern.component.scss'],
})

export class PortafolioModernComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getProject$: Observable<IProject[]> = new Observable();

  project: IProject;
  porfolioId: string;
  activeIndex = 0;

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {
    this.getProject$ = this.store.select(PortfolioState.ListAllProjects);
    this.porfolioId = this.activatedRoute.snapshot.params['porfolioId'];
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getProject$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.project = resp.find((product) => product.id === this.porfolioId);
      }
    });
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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
