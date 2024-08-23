import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { PostPaymentAction, SuccesStripePaymentAction } from './payment.actions';
import { PaymentService } from '../../services/payment/payment.service';
import { IPaymentResponse } from '../../interfaces/payment.interface';

export interface PaymentStateModel {
  paymentResponse: IPaymentResponse;
  successStripePayment: boolean;
}

@State<PaymentStateModel>({
  name: 'payment',
  defaults: {
    paymentResponse: null,
    successStripePayment: false,
  },
})

@Injectable()
export class PaymentState {
  @Selector() static GetPaymentResponse(
    state: PaymentStateModel
  ): IPaymentResponse {
    return state?.paymentResponse ?? null;
  }

  @Selector() static SuccesStripePayment(
    state: PaymentStateModel
  ): boolean {
    return state?.successStripePayment ?? false;
  }

  constructor(private paymentService: PaymentService) {}

  @Action(PostPaymentAction)
  PostPaymentAction(
    ctx: StateContext<PaymentStateModel>,
    { payload }: PostPaymentAction
  ) {
    return payload?.member_id
      ? this.paymentService.postPayment(payload).pipe(
          tap({
            next: (resp) => {
              if (resp) {
                ctx.patchState({
                  paymentResponse: resp,
                });
              }
            },
          })
        )
      : ctx.patchState({
          paymentResponse: null,
        });
  }

  @Action(SuccesStripePaymentAction)
  SuccesStripePaymentAction(
    ctx: StateContext<PaymentStateModel>,
    { payload }: SuccesStripePaymentAction
  ) {
    return ctx.patchState({
      successStripePayment: payload,
    });
  }
}
