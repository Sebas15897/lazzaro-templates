import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { IShop, IShopSection } from '../../interfaces/shop.interface';
import { getAllProducts, GetShopSection } from './shop.actions';
import { ShopService } from '../../services/shop/shop.service';

export interface ShopStateModel {
  shopSection: IShopSection;
  shop: IShop[];
}

@State<ShopStateModel>({
  name: 'shop',
  defaults: {
    shopSection: null,
    shop: [],
  },
})

@Injectable()
export class ShopState {
  @Selector() static ShopSection(state: ShopStateModel): IShopSection {
    return state?.shopSection ?? null;
  }

  @Selector() static ListAllProducts(state: ShopStateModel): IShop[] {
    return state?.shop ?? [];
  }

  constructor(private shopService: ShopService) {}

  @Action(GetShopSection)
  GetShopSection(
    ctx: StateContext<ShopStateModel>,
    { payload }: GetShopSection
  ) {
    return this.shopService.getSectionShop(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              shopSection: resp,
            });
          }
        },
      })
    );
  }

  @Action(getAllProducts)
  getAllProducts(
    ctx: StateContext<ShopStateModel>,
    { payload }: getAllProducts
  ) {
    return this.shopService.getShop(payload).pipe(
      tap({
        next: (resp) => {
          if (resp && resp.length) {
            ctx.patchState({
              shop: resp,
            });
          }
        },
      })
    );
  }
}
