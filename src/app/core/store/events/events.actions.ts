import { IEvent } from '../../interfaces/events.interface';

export class GetEventsSectionAction {
  static readonly type = '[Templates - portfolio] Get Events Section';
  constructor(public payload: string) {}
}

export class GetAllEvents {
  static readonly type = '[Templates - portfolio] Get All Events';
  constructor(public payload: string) {}
}

export class SelectEventAction {
  static readonly type = '[Templates - portfolio] Select Event Action';
  constructor(public payload: IEvent) {}
}

