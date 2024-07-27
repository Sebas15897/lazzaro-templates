export class GetServicesSectionAction {
  static readonly type = '[Templates - Services] Get Services Section';
  constructor(public payload: string) {}
}

export class GetAllServices {
  static readonly type = '[Templates - Services] Get All Services';
  constructor(public payload: string) {}
}
