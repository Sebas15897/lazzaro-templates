import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayServiceComponent } from './pay-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayServiceRoutingModule } from './pay-service-routing.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedModule } from '../../../../shared/shared.module';
import { StripeComponent } from '../../../../shared/stripe/stripe.component';

@NgModule({
  declarations: [PayServiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PayServiceRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
    StripeComponent
  ],
})

export class PayServiceModule {}
