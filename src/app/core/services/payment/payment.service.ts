import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../config/app-settings/app.settings';
import {
  IPayloadPayment,
  IPaymentResponse,
} from '../../interfaces/payment.interface';

@Injectable({
  providedIn: 'root',
})

export class PaymentService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  postPayment(payload: IPayloadPayment): Observable<IPaymentResponse> {
    const url = this.appSettings.payment.postCreatePayment;
    return this.http.post<IPaymentResponse>(url, payload);
  }
}
