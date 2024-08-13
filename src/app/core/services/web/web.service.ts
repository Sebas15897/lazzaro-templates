import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWebConfig } from '../../interfaces/web-config.interface';
import { AppSettings } from '../../config/app-settings/app.settings';
import { IWebSite } from '../../interfaces/web.interface';

@Injectable({
  providedIn: 'root',
})

export class WebDataService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  getWebConfig(): Observable<IWebConfig> {
    const url = `${
      this.appSettings.webConfig.members
    }${'buceaconmigo.web.lazzaro.io'}`;
    return this.http.get<IWebConfig>(url);
  }

  getWebData(payload: string): Observable<IWebSite> {
    const url = `${this.appSettings.webConfig.websites}${payload}/section/web`;
    return this.http.get<IWebSite>(url);
  }
}
