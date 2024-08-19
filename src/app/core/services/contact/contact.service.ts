import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../config/app-settings/app.settings';
import { IPayloadContact } from '../../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  postSendMail(payload: IPayloadContact): Observable<IPayloadContact> {
    const url = this.appSettings.contact.postSendMail;
    return this.http.post<IPayloadContact>(url, payload);
  }
}
