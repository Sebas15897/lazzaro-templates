import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import {
  IPayloadPayment,
  IPaymentResponse,
} from '../../core/interfaces/payment.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaymentState } from '../../core/store/payment/payment.state';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { SweetAlertHelper } from '../../core/config/sweet-alert/sweet-alert.helper';
import {
  LoadingHiddeAction,
  LoadingShowAction,
} from '../../core/store/loading/loading.actions';
import { SuccesStripePaymentAction } from '../../core/store/payment/payment.actions';
import { PostCreateOrderAction } from '../../core/store/shop/shop.actions';
import { ICreateOrderPayload } from '../../core/interfaces/shop.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
  ],
})
export class StripeComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  @Input() payloadPayment: IPayloadPayment = null;
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  payResponse$: Observable<IPaymentResponse> = new Observable();

  readonly stripe = injectStripe(environment.stripeKey);

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
  };

  paying = signal(false);

  paymentId: string;

  constructor(
    private store: Store,
    private sweetAlertHelper: SweetAlertHelper
  ) {
    this.payResponse$ = this.store.select(PaymentState.GetPaymentResponse);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.payResponse$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.elementsOptions.clientSecret = resp?.clientSecret;
        this.paymentId = resp?.paymentId;
      }
    });
  }

  collectPayment() {
    if (this.paying()) return;
    this.paying.set(true);
    this.store.dispatch(new LoadingShowAction());
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.payloadPayment?.client_info?.name,
              email: this.payloadPayment?.client_info?.email,
              address: {
                line1: this.payloadPayment?.client_info?.address,
                postal_code: this.payloadPayment?.client_info?.postal_code,
                city: this.payloadPayment?.client_info?.city,
                country: this.payloadPayment?.client_info?.country,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (result) => {
          this.paying.set(false);
          if (result.error) {
            this.paying.set(false);
            this.error();
          } else if (result.paymentIntent.status === 'succeeded') {
            this.store.dispatch(new LoadingHiddeAction());
            this.paying.set(false);
            const text =
              this.payloadPayment.entityType === 'Product'
                ? 'El pago se ha realizado con éxito.'
                : 'El pago se ha realizado con éxito. Ahora puedes agendar una cita.';
            this.sweetAlertHelper.createCustomAlert({
              title: '¡Éxito!',
              text: text,
              icon: 'success',
            });
            if (this.payloadPayment.entityType === 'Product') {
              const payload: ICreateOrderPayload = {
                id: uuidv4(),
                member_id: this.payloadPayment.member_id,
                payment_id: this.paymentId,
                product_id: this.payloadPayment.productId,
              };
              this.store.dispatch(new PostCreateOrderAction(payload));
            }
            this.store.dispatch(new SuccesStripePaymentAction(true));
          }
        },
        error: () => {
          this.paying.set(false);
          this.error();
        },
      });
  }

  error() {
    this.sweetAlertHelper.createCustomAlert({
      title: 'Error!',
      text: 'Ha ocurrido un error al procesar tu pago. Por favor, verifica que los datos ingresados sean correctos',
      icon: 'error',
    });
    this.store.dispatch(new LoadingHiddeAction());
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
