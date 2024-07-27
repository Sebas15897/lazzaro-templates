import { Injectable } from '@angular/core';
import { EndPoints } from '../end-points/end-points';
@Injectable({
  providedIn: 'root',
})

export class AppSettings {
  public webConfig = {
    base: EndPoints.urlBase(''),
    members: EndPoints.urlBase('members/url/'),
    websites: EndPoints.urlBase('websites/')
  };

  public services = {
    getServices: EndPoints.urlBase('service/member/'),
  }

  public app = {
    name: 'Lazzaro Templates',
    version: '0.0.0',
  };
}
