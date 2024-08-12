import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormHeaderComponent } from '../../core/components/form-header/form-header.component';

@Component({
  selector: 'app-form-buy',
  templateUrl: './form-buy.component.html',
  styleUrls: ['./form-buy.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent],
})


export class FormBuyComponent {


  constructor(private fb: FormBuilder) {
/*     this.form = this.fb.group({
      member_id: '62c51bc5-96c4-4be5-a96c-e79041e238b3',
      client_info: {
        name: 'asd asd',
        email: 'asd',
        phone: 'asdas',
        address: 'dasd',
        dni: 'asdasdasdasd',
        birthdate: '2024-06-19',
        postal_code: 'asdasd',
        city: 'asd',
        country: 'asd',
        message: 'asd',
      },
      amount: 4620,
      entityType: 'Product',
      productId: '41565799-f9e9-4863-a533-37a25dac6680',
      serviceId: null,
      eventId: null,
    }); */
  }
}
