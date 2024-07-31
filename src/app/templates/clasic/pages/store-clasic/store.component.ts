import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { ServicesState } from '../../../../core/store/services/services.state';
import {
  IShop,
  IShopSection,
} from '../../../../core/interfaces/shop.interface';
import { ShopState } from '../../../../core/store/shop/shop.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})

export class StoreComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listProducts$: Observable<IShop[]> = new Observable();
  sectionShop$: Observable<IShopSection> = new Observable();

  listProducts: IShop[];
  sectionShop: IShopSection;

  constructor(private store: Store, private router: Router) {
    this.listProducts$ = this.store.select(ShopState.ListAllProducts);
    this.sectionShop$ = this.store.select(ShopState.ShopSection);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.listProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listProducts = resp;
    });

    this.sectionShop$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.sectionShop = resp;
    });
  }

  redirect(id: string) {
    this.router.navigate([`/clasic/product/${id}`]);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
