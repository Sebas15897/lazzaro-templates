import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../config/app-settings/app.settings';
import {
  ICreateOrderPayload,
  IShop,
  IShopSection,
} from '../../interfaces/shop.interface';

@Injectable({
  providedIn: 'root',
})

export class ShopService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  getSectionShop(payload: string): Observable<IShopSection> {
    const url = `${this.appSettings.webConfig.websites}${payload}/section/shop`;
    return this.http.get<IShopSection>(url);
  }

  getShop(payload: string): Observable<IShop[]> {
    const url = `${this.appSettings.shop.getProducts}${payload}`;
    return this.http.get<IShop[]>(url);
  }

  postCreatedOrder(payload: ICreateOrderPayload): Observable<IShop[]> {
    const url = this.appSettings.shop.postCreateOrder;
    return this.http.post<IShop[]>(url, payload);
  }
}
