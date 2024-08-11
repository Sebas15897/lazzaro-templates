import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { GetAllProjects, GetProjectsSectionAction } from './portfolio.actions';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import {
  IPortfolioSection,
  IProject,
} from '../../interfaces/portfolio.iterface';

export interface PortfolioStateModel {
  portfolioSection: IPortfolioSection;
  portfolio: IProject[];
}

@State<PortfolioStateModel>({
  name: 'portfolio',
  defaults: {
    portfolioSection: null,
    portfolio: [],
  },
})

@Injectable()
export class PortfolioState {
  @Selector() static PortfolioSection(
    state: PortfolioStateModel
  ): IPortfolioSection {
    return state?.portfolioSection ?? null;
  }

  @Selector() static ListAllProjects(state: PortfolioStateModel): IProject[] {
    return state?.portfolio ?? [];
  }

  constructor(private portfolioDataService: PortfolioService) {}

  @Action(GetProjectsSectionAction)
  GetProjectsSectionAction(
    ctx: StateContext<PortfolioStateModel>,
    { payload }: GetProjectsSectionAction
  ) {
    return this.portfolioDataService.getSectionPortfolio(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              portfolioSection: resp,
            });
          }
        },
      })
    );
  }

  @Action(GetAllProjects)
  GetAllProjects(
    ctx: StateContext<PortfolioStateModel>,
    { payload }: GetAllProjects
  ) {
    return this.portfolioDataService.getPortfolio(payload).pipe(
      tap({
        next: (resp) => {
          if (resp && resp.length) {
            ctx.patchState({
              portfolio: resp,
            });
          }
        },
      })
    );
  }
}
