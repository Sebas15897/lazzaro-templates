import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  IAboutUs,
  IBookings,
  IContact,
  IFooter,
  IHomePage,
  IImpact,
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
import { GetAllEvents, GetEventsSectionAction } from '../events/events.actions';
import {
  GetAllProjects,
  GetProjectsSectionAction,
} from '../portfolio/portfolio.actions';
import { Router } from '@angular/router';

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

  @Selector() static webConfig(state: WebStateModel): IWebConfig {
    return state?.webConfig ?? null;
  }

  @Selector() static footer(state: WebStateModel): IFooter {
    return state?.webProps?.properties?.footer ?? null;
  }

  @Selector() static impactData(state: WebStateModel): IImpact {
    return state?.webProps?.properties?.impact ?? null;
  }

  @Selector() static bookings(state: WebStateModel): IBookings {
    return state?.webProps?.properties?.bookings ?? null;
  }

  @Selector() static contact(state: WebStateModel): IContact {
    return state?.webProps?.properties?.contact ?? null;
  }

  @Selector() static appStyle(state: WebStateModel): IStyle {
    return state?.webProps?.properties?.style ?? null;
  }

  constructor(
    private webDataService: WebDataService,
    private titleService: Title,
    private router: Router,
    private ngZone: NgZone,
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
            this.ngZone.run(() => {
              this.router.navigate([`${resp.website.template}/home`]);
            });
            this.titleService.setTitle(resp.companyName);
            ctx.dispatch(new GetWebDataAction(resp.websiteId));
            ctx.dispatch(new GetServicesSectionAction(resp.websiteId));
            ctx.dispatch(new GetAllServices(resp.id));
            ctx.dispatch(new GetShopSection(resp.websiteId));
            ctx.dispatch(new getAllProducts(resp.id));
            ctx.dispatch(new GetEventsSectionAction(resp.websiteId));
            ctx.dispatch(new GetAllEvents(resp.id));
            ctx.dispatch(new GetProjectsSectionAction(resp.websiteId));
            ctx.dispatch(new GetAllProjects(resp.id));
          }
        },
      })
    );
  }
}
