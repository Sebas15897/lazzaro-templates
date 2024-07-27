import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { ServicesService } from '../../services/services/services.service';
import { GetAllServices, GetServicesSectionAction } from './services.actions';
import { IService, IServiceSection } from '../../interfaces/services.interface';

export interface ServicesStateModel {
  servicesSection: IServiceSection;
  services: IService[];
}

@State<ServicesStateModel>({
  name: 'services',
  defaults: {
    servicesSection: null,
    services: [],
  },
})

@Injectable()
export class ServicesState {
  @Selector() static ServiceSection(
    state: ServicesStateModel
  ): IServiceSection {
    return state?.servicesSection ?? null;
  }

  @Selector() static ListAllServices(state: ServicesStateModel): IService[] {
    return state?.services ?? [];
  }

  constructor(private ServicesDataService: ServicesService) {}

  @Action(GetServicesSectionAction)
  GetServicesSectionAction(
    ctx: StateContext<ServicesStateModel>,
    { payload }: GetAllServices
  ) {
    return this.ServicesDataService.getSectionServices(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              servicesSection: resp,
            });
          }
        },
      })
    );
  }

  @Action(GetAllServices)
  GetAllServices(
    ctx: StateContext<ServicesStateModel>,
    { payload }: GetAllServices
  ) {
    return this.ServicesDataService.getServices(payload).pipe(
      tap({
        next: (resp) => {
          if (resp && resp.length) {
            ctx.patchState({
              services: resp,
            });
          }
        },
      })
    );
  }
}
