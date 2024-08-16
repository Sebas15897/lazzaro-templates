import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class SweetAlertHelper {
  constructor() {}

  createCustomAlert(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }
}
