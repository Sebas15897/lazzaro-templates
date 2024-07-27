import { environment } from '../../../../environments/environment';

export class EndPoints {
  static url(resource: string) {
    return environment.url + resource;
  }

  static urlBase(resource: string) {
    return environment.base_url + resource;
  }

  static isProduction(): boolean {
    return environment.production;
  }
}
