import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { IEvent, IEventsSection } from '../../interfaces/events.interface';
import { EventsService } from '../../services/events/events.service';
import {
  GetAllEvents,
  GetEventsSectionAction,
  SelectEventAction,
} from './events.actions';

export interface EventsStateModel {
  eventsSection: IEventsSection;
  events: IEvent[];
  selectedEvent: IEvent;
}

@State<EventsStateModel>({
  name: 'events',
  defaults: {
    eventsSection: null,
    events: [],
    selectedEvent: null,
  },
})

@Injectable()
export class EventsState {
  @Selector() static EventsSection(state: EventsStateModel): IEventsSection {
    return state?.eventsSection ?? null;
  }

  @Selector() static ListAllEvents(state: EventsStateModel): IEvent[] {
    return state?.events ?? [];
  }

  @Selector() static SelectEvent(state: EventsStateModel): IEvent {
    return state?.selectedEvent ?? null;
  }

  constructor(private eventsDataService: EventsService) {}

  @Action(GetEventsSectionAction)
  GetEventsSectionAction(
    ctx: StateContext<EventsStateModel>,
    { payload }: GetEventsSectionAction
  ) {
    return this.eventsDataService.getSectionEvents(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              eventsSection: resp,
            });
          }
        },
      })
    );
  }

  @Action(GetAllEvents)
  GetAllEvents(ctx: StateContext<EventsStateModel>, { payload }: GetAllEvents) {
    return this.eventsDataService.getEvents(payload).pipe(
      tap({
        next: (resp) => {
          if (resp && resp.length) {
            ctx.patchState({
              events: resp,
            });
          }
        },
      })
    );
  }

  @Action(SelectEventAction)
  SelectEventAction(
    ctx: StateContext<EventsStateModel>,
    { payload }: SelectEventAction
  ) {
    return ctx.patchState({
      selectedEvent: payload,
    });
  }
}
