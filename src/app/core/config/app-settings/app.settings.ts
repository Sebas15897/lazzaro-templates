import { Injectable } from '@angular/core';
import { EndPoints } from '../end-points/end-points';

@Injectable({
  providedIn: 'root',
})

export class AppSettings {
  public webConfig = {
    base: EndPoints.urlBase(''),
    members: EndPoints.urlBase('members/url/'),
    websites: EndPoints.urlBase('websites/'),
  };

  public contact = {
    postSendMail: EndPoints.urlBase('mail/send'),
  };

  public services = {
    getServices: EndPoints.urlBase('service/member/'),
  };

  public events = {
    getEvents: EndPoints.urlBase('events/member/'),
  };

  public portfolio = {
    getPortfolio: EndPoints.urlBase('projects/member/'),
  };

  public shop = {
    getProducts: EndPoints.urlBase('product/member/'),
    postCreateOrder: EndPoints.urlBase('orders')
  };

  public payment = {
    postCreatePayment: EndPoints.urlBase('payment'),
  };

  public app = {
    name: 'Lazzaro Templates',
    version: '0.0.0',
  };
}
