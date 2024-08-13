import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IFooter, IStyle } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  footer$: Observable<IFooter> = new Observable();
  styles$: Observable<IStyle> = new Observable();

  footer: IFooter;

  styles: IStyle;

  constructor(
    private store: Store,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    this.footer$ = this.store.select(WebState.footer);
    this.styles$ = this.store.select(WebState.styleData);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.viewportScroller.scrollToAnchor(tree.fragment);
        }
      }
    });
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
        console.log(resp);
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
