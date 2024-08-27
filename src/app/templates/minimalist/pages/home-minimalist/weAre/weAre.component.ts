import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IAboutUs, IWhyChooseUs } from 'src/app/core/interfaces/web.interface';
import { WebState } from 'src/app/core/store/web/web.state';

@Component({
  selector: 'app-weAre',
  templateUrl: './weAre.component.html',
  styleUrls: ['./weAre.component.scss']
})

export class WeAreComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy: Subject<boolean> = new Subject<boolean>();
  aboutUs$: Observable<IAboutUs> = new Observable();
  whyChooseUsData$: Observable<IWhyChooseUs> = new Observable();

  aboutUs: IAboutUs;
  whyChooseUsData: IWhyChooseUs;

  maxHeightAboutUs:String = "190px";
  @ViewChild('leftContentAboutUs') leftContentAboutUs!: ElementRef<HTMLDivElement>;
  @ViewChild('rightContentAboutUs') rightContentAboutUs!: ElementRef<HTMLDivElement>;

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

  seeMore(){
    this.maxHeightAboutUs = this.maxHeightAboutUs === '190px' ? '100%' : '190px';
    this.heightRight();
  }

  heightRight(){
    setTimeout(() => {
      const divHeight = this.leftContentAboutUs.nativeElement.offsetHeight;
      this.rightContentAboutUs.nativeElement.style.height = `${divHeight}px`;
    }, 0);
  }
}

