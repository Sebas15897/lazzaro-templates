import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IShop, IShopSection } from 'src/app/core/interfaces/shop.interface';
import { ShopState } from 'src/app/core/store/shop/shop.store';

@Component({
  selector: 'app-store-modern',
  templateUrl: './store-modern.component.html',
  styleUrls: ['./store-modern.component.scss']
})
export class StoreModernComponent implements OnInit, OnDestroy {

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
    this.router.navigate([`/modern/product/${id}`]);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
