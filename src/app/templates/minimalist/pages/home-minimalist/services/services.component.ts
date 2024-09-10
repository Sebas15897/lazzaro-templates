import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import {
  IService,
  IServiceSection,
} from '../../../../../core/interfaces/services.interface';
import { ServicesState } from '../../../../../core/store/services/services.state';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})

export class ServicesComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listServices$: Observable<IService[]> = new Observable();
  sectionServices$: Observable<IServiceSection> = new Observable();

  listServices: IService[];
  sectionServices: IServiceSection;

  constructor(
    private store: Store,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.listServices$ = this.store.select(ServicesState.ListAllServices);
    this.sectionServices$ = this.store.select(ServicesState.ServiceSection);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.listServices$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listServices = resp;
    });

    this.sectionServices$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.sectionServices = resp;
    });
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  payService(service: IService) {
    this.router.navigate([`/minimalist/pay-service/${service.id}`]);
  }

  viewMore(event: Event, service: IService) {
    event.stopPropagation();
    this.router.navigate([`/minimalist/service/${service.id}`]);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
