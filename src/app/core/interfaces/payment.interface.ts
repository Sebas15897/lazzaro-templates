export interface IPayloadPayment {
  member_id: string;
  client_info: IClientInfo;
  amount: number;
  entityType: string;
  productId: null;
  serviceId: string;
  eventId: null;
}

export interface IClientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  dni: string;
  birthdate: Date;
  postal_code: string;
  city: string;
  country: string;
  message: string;
}

export interface IPaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
  paymentId: string;
}
