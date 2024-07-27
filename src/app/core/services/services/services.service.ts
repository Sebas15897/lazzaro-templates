import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../config/app-settings/app.settings';
import { IService, IServiceSection } from '../../interfaces/services.interface';

@Injectable({
  providedIn: 'root',
})

export class ServicesService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  getSectionServices(payload: string): Observable<IServiceSection> {
    const url = `${this.appSettings.webConfig.websites}${payload}/section/services`;
    return this.http.get<IServiceSection>(url);
  }

  getServices(payload: string): Observable<IService[]> {
    const url = `${this.appSettings.services.getServices}${payload}`;
    return this.http.get<IService[]>(url);
  }
}
