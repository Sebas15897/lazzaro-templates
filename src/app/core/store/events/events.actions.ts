export class GetEventsSectionAction {
  static readonly type = '[Templates - portfolio] Get Events Section';
  constructor(public payload: string) {}
}

export class GetAllEvents {
  static readonly type = '[Templates - portfolio] Get All Events';
  constructor(public payload: string) {}
}
