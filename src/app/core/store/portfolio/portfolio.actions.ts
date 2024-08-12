import { IProject } from '../../interfaces/portfolio.iterface';

export class GetProjectsSectionAction {
  static readonly type = '[Templates - portfolio] Get Projects Section';
  constructor(public payload: string) {}
}

export class GetAllProjects {
  static readonly type = '[Templates - portfolio] Get All Projects';
  constructor(public payload: string) {}
}


export class SelectProjectAction {
  static readonly type = '[Templates - portfolio] Select a Project';
  constructor(public payload: IProject) {}
}

