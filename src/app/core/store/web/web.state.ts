import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  IAboutUs,
  IFooter,
  IHomePage,
  IStyle,
  ITeam,
  IWebSite,
  IWhyChooseUs,
} from '../../interfaces/web.interface';
import { GetWebConfigction, GetWebDataAction } from './web.actions';
import { WebDataService } from '../../services/web/web.service';
import { tap } from 'rxjs';
import { IWebConfig } from '../../interfaces/web-config.interface';
import { Title } from '@angular/platform-browser';
import {
  GetAllServices,
  GetServicesSectionAction,
} from '../services/services.actions';
import { GetShopSection, getAllProducts } from '../shop/shop.actions';

export interface WebStateModel {
  webProps: IWebSite;
  webConfig: IWebConfig;
}

@State<WebStateModel>({
  name: 'web',
  defaults: {
    webProps: null,
    webConfig: null,
  },
})
@Injectable()
export class WebState {
  @Selector() static webIsActive(state: WebStateModel): boolean {
    return state?.webProps?.active ?? false;
  }

  @Selector() static homePageData(state: WebStateModel): IHomePage {
    return state?.webProps?.properties?.homePage ?? null;
  }

  @Selector() static aboutUsData(state: WebStateModel): IAboutUs {
    return state?.webProps?.properties?.aboutUs ?? null;
  }

  @Selector() static whyChooseUsData(state: WebStateModel): IWhyChooseUs {
    return state?.webProps?.properties?.whyChooseUs ?? null;
  }

  @Selector() static styleData(state: WebStateModel): IStyle {
    return state?.webProps?.properties?.style ?? null;
  }

  @Selector() static teamData(state: WebStateModel): ITeam {
    return state?.webProps?.properties?.team ?? null;
  }

  @Selector() static webConfig(state: WebStateModel): ITeam {
    return state?.webProps?.properties?.team ?? null;
  }

  @Selector() static footer(state: WebStateModel): IFooter {
    return state?.webProps?.properties?.footer ?? null;
  }

  constructor(
    private webDataService: WebDataService,
    private titleService: Title
  ) {}

  @Action(GetWebDataAction)
  GetWebDataAction(
    ctx: StateContext<WebStateModel>,
    { payload }: GetWebDataAction
  ) {
    return this.webDataService.getWebData(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              webProps: resp,
            });
          }
        },
      })
    );
  }

  @Action(GetWebConfigction)
  GetWebConfigction(ctx: StateContext<WebStateModel>) {
    return this.webDataService.getWebConfig().pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              webConfig: resp,
            });
            this.titleService.setTitle(resp.companyName);
            ctx.dispatch(new GetWebDataAction(resp.websiteId));
            ctx.dispatch(new GetServicesSectionAction(resp.websiteId));
            ctx.dispatch(new GetAllServices(resp.id));
            ctx.dispatch(new GetShopSection(resp.websiteId));
            ctx.dispatch(new getAllProducts(resp.id));
          }
        },
      })
    );
  }
}
