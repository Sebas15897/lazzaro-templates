import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import {
  IAboutUs,
  IWhyChooseUs,
} from '../../../../../core/interfaces/web.interface';
import { WebState } from '../../../../../core/store/web/web.state';

@Component({
  selector: 'app-weAre',
  templateUrl: './weAre.component.html',
  styleUrls: ['./weAre.component.scss'],
})

export class WeAreComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy: Subject<boolean> = new Subject<boolean>();
  aboutUs$: Observable<IAboutUs> = new Observable();
  whyChooseUsData$: Observable<IWhyChooseUs> = new Observable();

  aboutUs: IAboutUs;
  whyChooseUsData: IWhyChooseUs;

  maxHeightAboutUs: String = '190px';
  @ViewChild('leftContentAboutUS')
  leftContentAboutUS!: ElementRef<HTMLDivElement>;
  @ViewChild('rightContentAboutUs')
  rightContentAboutUs!: ElementRef<HTMLDivElement>;

  constructor(private store: Store, cdr: ChangeDetectorRef) {
    this.aboutUs$ = this.store.select(WebState.aboutUsData);
    this.whyChooseUsData$ = this.store.select(WebState.whyChooseUsData);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.aboutUs$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.aboutUs = resp;
    });

    this.whyChooseUsData$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.whyChooseUsData = resp;
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.heightRight();
    }, 1000);
  }

  seeMore() {
    this.maxHeightAboutUs =
      this.maxHeightAboutUs === '190px' ? '100%' : '190px';
    this.heightRight();
  }

  heightRight() {
    setTimeout(() => {
      const divHeight = this.leftContentAboutUS.nativeElement.offsetHeight;
      this.rightContentAboutUs.nativeElement.style.height = `${divHeight}px`;
    }, 0);
  }

  redirect(url: string) {
    window.open(url, '_blank');
  }
}
