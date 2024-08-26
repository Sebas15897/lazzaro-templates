import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import {
  IService,
  IServiceSection,
} from '../../../../../core/interfaces/services.interface';
import { ServicesState } from '../../../../../core/store/services/services.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.listServices$ = this.store.select(ServicesState.ListAllServices);
    this.sectionServices$ = this.store.select(ServicesState.ServiceSection);
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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

  payService(service: IService) {
    this.router.navigate([`/classic/pay-service/${service.id}`]);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
