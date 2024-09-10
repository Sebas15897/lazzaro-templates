import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IStyle, ITeam } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';
import { IEventsSection } from '../../../../../core/interfaces/events.interface';
import { IPortfolioSection } from '../../../../../core/interfaces/portfolio.iterface';
import { IServiceSection } from '../../../../../core/interfaces/services.interface';
import { IShopSection } from '../../../../../core/interfaces/shop.interface';
import { EventsState } from '../../../../../core/store/events/events.state';
import { PortfolioState } from '../../../../../core/store/portfolio/portfolio.state';
import { ShopState } from '../../../../../core/store/shop/shop.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  styles$: Observable<IStyle> = new Observable();

  sectionEvents$: Observable<IEventsSection> = new Observable();
  teamData$: Observable<ITeam> = new Observable();
  sectionProjects$: Observable<IPortfolioSection> = new Observable();
  sectionServices$: Observable<IServiceSection> = new Observable();
  sectionShop$: Observable<IShopSection> = new Observable();

  styles: IStyle;

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private store: Store
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.viewportScroller.scrollToAnchor(tree.fragment);
        }
      }
    });

    this.styles$ = this.store.select(WebState.styleData);

    this.sectionEvents$ = this.store.select(EventsState.EventsSection);
    this.teamData$ = this.store.select(WebState.teamData);
    this.sectionProjects$ = this.store.select(PortfolioState.PortfolioSection);
    this.sectionShop$ = this.store.select(ShopState.ShopSection);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.styles$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.styles = resp;
      if (resp) {
        this.updateFavicon(resp?.logo);
      }
    });
  }

  updateFavicon(iconUrl: string) {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = iconUrl;
    } else {
      const newLink: HTMLLinkElement = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = iconUrl;
      document.head.appendChild(newLink);
    }
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }


  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(){
    this.menuOpen = false;
  }
}
