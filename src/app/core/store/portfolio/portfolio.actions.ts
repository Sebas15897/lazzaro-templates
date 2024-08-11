export class GetProjectsSectionAction {
  static readonly type = '[Templates - portfolio] Get Projects Section';
  constructor(public payload: string) {}
}

export class GetAllProjects {
  static readonly type = '[Templates - portfolio] Get All Projects';
  constructor(public payload: string) {}
}
