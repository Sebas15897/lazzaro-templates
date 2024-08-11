import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../config/app-settings/app.settings';
import { IPortfolioSection, IProject } from '../../interfaces/portfolio.iterface';

@Injectable({
  providedIn: 'root',
})

export class PortfolioService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  getSectionPortfolio(payload: string): Observable<IPortfolioSection> {
    const url = `${this.appSettings.webConfig.websites}${payload}/section/projects`;
    return this.http.get<IPortfolioSection>(url);
  }

  getPortfolio(payload: string): Observable<IProject[]> {
    const url = `${this.appSettings.portfolio.getPortfolio}${payload}`;
    return this.http.get<IProject[]>(url);
  }
}
