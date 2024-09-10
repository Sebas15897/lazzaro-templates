import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import {
  IFooter,
  IStyle,
  ITeam,
} from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { IEventsSection } from '../../../../../core/interfaces/events.interface';
import { IPortfolioSection } from '../../../../../core/interfaces/portfolio.iterface';
import { IServiceSection } from '../../../../../core/interfaces/services.interface';
import { IShopSection } from '../../../../../core/interfaces/shop.interface';
import { EventsState } from '../../../../../core/store/events/events.state';
import { PortfolioState } from '../../../../../core/store/portfolio/portfolio.state';
import { ShopState } from '../../../../../core/store/shop/shop.store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  footer$: Observable<IFooter> = new Observable();
  styles$: Observable<IStyle> = new Observable();

  sectionEvents$: Observable<IEventsSection> = new Observable();
  teamData$: Observable<ITeam> = new Observable();
  sectionProjects$: Observable<IPortfolioSection> = new Observable();
  sectionServices$: Observable<IServiceSection> = new Observable();
  sectionShop$: Observable<IShopSection> = new Observable();

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

    this.sectionEvents$ = this.store.select(EventsState.EventsSection);
    this.teamData$ = this.store.select(WebState.teamData);
    this.sectionProjects$ = this.store.select(PortfolioState.PortfolioSection);
    this.sectionShop$ = this.store.select(ShopState.ShopSection);
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
