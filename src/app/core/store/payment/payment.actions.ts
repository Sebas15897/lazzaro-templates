import { IPayloadPayment } from '../../interfaces/payment.interface';

export class PostPaymentAction {
  static readonly type = '[Templates - Payment] Post Payment Action';
  constructor(public payload: IPayloadPayment) {}
}

export class SuccesStripePaymentAction {
  static readonly type = '[Templates - Payment] Succes Stripe Payment Action';
  constructor(public payload: boolean) {}
}
