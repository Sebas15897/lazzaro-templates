import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IService } from '../../../../core/interfaces/services.interface';
import { ServicesState } from '../../../../core/store/services/services.state';

@Component({
  selector: 'app-service-minimalist',
  templateUrl: './service-minimalist.component.html',
  styleUrls: ['./service-minimalist.component.scss']
})

export class ServiceMinimalistComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listServices$: Observable<IService[]> = new Observable();

  serviceId: string;
  service: IService;

  activeIndex = 0;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.listServices$ = this.store.select(ServicesState.ListAllServices);
    this.serviceId = this.activatedRoute.snapshot.params['serviceid'];
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.listServices$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.service = resp.find((service) => service.id === this.serviceId);
      }
    });
  }

  buy() {
    this.router.navigate([`/minimalist/pay-service/${this.serviceId}`]);
  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
