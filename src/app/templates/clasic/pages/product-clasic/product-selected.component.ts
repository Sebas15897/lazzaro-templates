import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IShop } from '../../../../core/interfaces/shop.interface';
import { ShopState } from '../../../../core/store/shop/shop.store';
import { MatDialog } from '@angular/material/dialog';
import { FormBuyComponent } from '../../../../shared/form-buy/form-buy.component';

@Component({
  selector: 'app-product-selected',
  templateUrl: './product-selected.component.html',
  styleUrls: ['./product-selected.component.scss'],
})

export class ProductSelectedComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listProducts$: Observable<IShop[]> = new Observable();

  productId: string;
  product: IShop;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.listProducts$ = this.store.select(ShopState.ListAllProducts);
    this.productId = this.activatedRoute.snapshot.params['productid'];
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.listProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.product = resp.find((product) => product.id === this.productId);
      }
    });
  }

  buy() {
    this.dialog.open(FormBuyComponent, {
      width: '600px',
      data: this.product,
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
