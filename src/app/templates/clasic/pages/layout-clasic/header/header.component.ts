import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IStyle } from '../../../../../core/interfaces/web.interface';
import { Store } from '@ngxs/store';
import { WebState } from '../../../../../core/store/web/web.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  menuOpen = false;

  toggleMenu() {
    console.log('toggle')
    
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(){
    this.menuOpen = false;
  }
}
