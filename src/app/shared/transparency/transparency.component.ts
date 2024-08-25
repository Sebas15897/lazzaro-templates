import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IFooter, IStyle } from '../../core/interfaces/web.interface';
import { WebState } from '../../core/store/web/web.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss'],
})

export class TransparencyComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  footer$: Observable<IFooter> = new Observable();
  styles$: Observable<IStyle> = new Observable();

  footer: IFooter;

  styles: IStyle;

  constructor(private store: Store, private sanitizer: DomSanitizer) {
    this.footer$ = this.store.select(WebState.footer);
    this.styles$ = this.store.select(WebState.styleData);
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

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
