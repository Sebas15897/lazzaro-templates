import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IStyle } from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  styles$: Observable<IStyle> = new Observable();

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
