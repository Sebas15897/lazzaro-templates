import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../config/app-settings/app.settings';
import { IEvent, IEventsSection } from '../../interfaces/events.interface';

@Injectable({
  providedIn: 'root',
})

export class EventsService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  getSectionEvents(payload: string): Observable<IEventsSection> {
    const url = `${this.appSettings.webConfig.websites}${payload}/section/events`;
    return this.http.get<IEventsSection>(url);
  }

  getEvents(payload: string): Observable<IEvent[]> {
    const url = `${this.appSettings.events.getEvents}${payload}`;
    return this.http.get<IEvent[]>(url);
  }
}
