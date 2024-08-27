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
import {
  ICreateOrderPayload,
  IShop,
} from '../../core/interfaces/shop.interface';
import { v4 as uuidv4 } from 'uuid';
import { ISendMailPayload } from '../../core/interfaces/send-mail.interface';
import {
  PostSendMailAction,
  PostSendMailNoMessageAction,
} from '../../core/store/contact/contact.actions';
import { IWebConfig } from '../../core/interfaces/web-config.interface';
import { WebState } from '../../core/store/web/web.state';
import { IEvent } from '../../core/interfaces/events.interface';
import { EventsState } from '../../core/store/events/events.state';
import { ShopState } from '../../core/store/shop/shop.store';

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
  getListEvent$: Observable<IEvent[]> = new Observable();
  webConfig$: Observable<IWebConfig> = new Observable();
  listProducts$: Observable<IShop[]> = new Observable();
  webConfig: IWebConfig;

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

  event: IEvent;
  product: IShop;

  constructor(
    private store: Store,
    private sweetAlertHelper: SweetAlertHelper
  ) {
    this.payResponse$ = this.store.select(PaymentState.GetPaymentResponse);
    this.webConfig$ = this.store.select(WebState.webConfig);
    this.getListEvent$ = this.store.select(EventsState.ListAllEvents);
    this.listProducts$ = this.store.select(ShopState.ListAllProducts);
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

    this.webConfig$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.webConfig = resp;
      }
    });

    this.getListEvent$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.event = resp.find(
          (event) => event?.id === this.payloadPayment?.eventId
        );
      }
    });

    this.listProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.product = resp.find(
          (product) => product.id === this.payloadPayment?.productId
        );
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
            if (this.payloadPayment.entityType === 'Product') {
              let emailOrganizer = `<!DOCTYPE html>
                  <html lang="es">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lazzaro - Nueva Compra de Producto</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                      }
                      .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                        text-align: center;
                        padding-bottom: 20px;
                      }
                      .header h1 {
                        color: #333333;
                      }
                      .content {
                        line-height: 1.6;
                        color: #666666;
                      }
                      .content h2 {
                        color: #333333;
                        margin-bottom: 10px;
                      }
                      .content p {
                        margin: 5px 0;
                      }
                      .footer {
                        text-align: center;
                        padding-top: 20px;
                        color: #999999;
                        font-size: 12px;
                      }
                      .footer p {
                        margin: 5px 0;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                        <h1>Nueva Compra de Producto</h1>
                      </div>
                      <div class="content">
                        <h2>Hola, ${this.webConfig?.firstName} ${this.webConfig?.lastName}!</h2>
                        <p>Te informamos que un cliente ha realizado una nueva compra en tu tienda.</p>

                        <h3>Detalles del Cliente:</h3>
                        <p><strong>Nombre:</strong> ${this.payloadPayment?.client_info?.name}</p>
                        <p><strong>Email:</strong> ${this.payloadPayment?.client_info?.email}</p>
                        <p><strong>Teléfono:</strong> ${this.payloadPayment?.client_info?.phone}</p>
                        <p><strong>Mensaje del Cliente:</strong> ${this.payloadPayment?.client_info?.message}</p>

                        <h3>Detalles del Producto:</h3>
                        <p><strong>Nombre del Producto:</strong> ${this.product?.title}</p>
                        <p><strong>Precio Total:</strong> €${this.product?.price}</p>

                        <p>Gracias por confiar en nosotros. ¡Esperamos que tengas un excelente día!</p>
                      </div>
                      <div class="footer">
                        <p>Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
                        <p>&copy; 2024 Tu Lazzaro. Todos los derechos reservados.</p>
                      </div>
                    </div>
                  </body>
                  </html>
                  `;
              let emailShopProdut = `<!DOCTYPE html>
              <html lang="es">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lazzaro - Compra Exitosa</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                    text-align: center;
                    padding-bottom: 20px;
                  }
                  .header h1 {
                    color: #333333;
                  }
                  .content {
                    line-height: 1.6;
                    color: #666666;
                  }
                  .content h2 {
                    color: #333333;
                    margin-bottom: 10px;
                  }
                  .content p {
                    margin: 5px 0;
                  }
                  .footer {
                    text-align: center;
                    padding-top: 20px;
                    color: #999999;
                    font-size: 12px;
                  }
                  .footer p {
                    margin: 5px 0;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Lazzaro - Compra Exitosa - ${this.product?.title}</h1>
                  </div>
                  <div class="content">
                    <h2>Hola, ${this.payloadPayment?.client_info?.name}!</h2>
                    <p>Nos complace informarte que tu compra del producto ${
                      this.product?.title
                    }, ha sido procesada con éxito. A continuación, encontrarás los detalles de tu compra:</p>

                    <h3>Detalles del Cliente:</h3>
                    <p><strong>Nombre:</strong> ${
                      this.payloadPayment?.client_info?.name ?? 'N/A'
                    }</p>
                    <p><strong>Email:</strong> ${
                      this.payloadPayment?.client_info?.email ?? 'N/A'
                    }</p>
                    <p><strong>Teléfono:</strong> ${
                      this.payloadPayment?.client_info?.phone ?? 'N/A'
                    }</p>
                    <p><strong>Dirección:</strong> ${
                      this.payloadPayment?.client_info?.address ?? 'N/A'
                    }, ${this.payloadPayment?.client_info?.city ?? 'City'}, ${
                this.payloadPayment?.client_info?.postal_code ?? 'Postal Code'
              }, ${this.payloadPayment?.client_info?.country ?? 'Country'}</p>
                    <p><strong>DNI:</strong> ${
                      this.payloadPayment?.client_info?.dni ?? 'N/A'
                    }</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${
                      this.payloadPayment?.client_info?.birthdate ?? 'N/A'
                    }</p>

                    <h3>Detalles del Producto:</h3>
                    <p><strong>Producto:</strong> ${this.product?.title}</p>
                    <p><strong>Precio Total:</strong> €${
                      this.product?.price
                    }</p>

                    <h3>Mensaje del Cliente:</h3>
                    <p>${this.payloadPayment?.client_info?.message}</p>

                    <p>Gracias por confiar en nosotros para tu compra. ¡Esperamos que disfrutes de tu producto!</p>
                  </div>
                  <div class="footer">
                    <p>Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
                    <p>&copy; 2024 Lazzaro. Todos los derechos reservados.</p>
                  </div>
                </div>
              </body>
              </html>`;
              this.sweetAlertHelper.createCustomAlert({
                title: '¡Éxito!',
                text: 'El pago se ha realizado con éxito.',
                icon: 'success',
              });
              const payload: ICreateOrderPayload = {
                id: uuidv4(),
                member_id: this.payloadPayment.member_id,
                payment_id: this.paymentId,
                product_id: this.payloadPayment.productId,
              };
              const sendBuyerProduct: ISendMailPayload = {
                to: this.payloadPayment?.client_info?.email,
                subject: 'Lazzaro - Compra exitosa',
                message: emailShopProdut,
                from: this.webConfig?.email,
              };
              const sendOrganizerProduct: ISendMailPayload = {
                to: this.webConfig?.email,
                subject: 'Lazzaro - Compra exitosa',
                message: emailOrganizer,
                from: this.payloadPayment?.client_info?.email,
              };
              this.store.dispatch(
                new PostSendMailNoMessageAction(sendBuyerProduct)
              );
              this.store.dispatch(
                new PostSendMailNoMessageAction(sendOrganizerProduct)
              );
              this.store.dispatch(new PostCreateOrderAction(payload));
            } else if (this.payloadPayment.entityType === 'Event') {
              let emailTemplateBuyer = `
              <!DOCTYPE html>
              <html lang="es">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lazzaro - Reserva Exitosa</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                    text-align: center;
                    padding-bottom: 20px;
                  }
                  .header h1 {
                    color: #333333;
                  }
                  .content {
                    line-height: 1.6;
                    color: #666666;
                  }
                  .content h2 {
                    color: #333333;
                    margin-bottom: 10px;
                  }
                  .content p {
                    margin: 5px 0;
                  }
                  .footer {
                    text-align: center;
                    padding-top: 20px;
                    color: #999999;
                    font-size: 12px;
                  }
                  .footer p {
                    margin: 5px 0;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Lazzaro - Reserva Exitosa - ${this.event?.name}</h1>
                  </div>
                  <div class="content">
                    <h2>Hola, ${this.payloadPayment?.client_info?.name}!</h2>
                    <p>Nos complace informarte que tu reserva para el evento ${
                      this.event?.name
                    }, ha sido procesada con éxito. A continuación, encontrarás los detalles de tu reserva:</p>
                    <h3>Detalles del Cliente:</h3>
                    <p><strong>Nombre:</strong> ${
                      this.payloadPayment?.client_info?.name ?? 'N/A'
                    }</p>
                    <p><strong>Email:</strong> ${
                      this.payloadPayment?.client_info?.email ?? 'N/A'
                    }</p>
                    <p><strong>Teléfono:</strong> ${
                      this.payloadPayment?.client_info?.phone ?? 'N/A'
                    }</p>
                    <p><strong>Dirección:</strong> ${
                      this.payloadPayment?.client_info?.address ?? 'N/A'
                    }, ${this.payloadPayment?.client_info?.city ?? 'City'}, ${
                this.payloadPayment?.client_info?.postal_code ?? 'Postal Code'
              }, ${this.payloadPayment?.client_info?.country ?? 'Country'}</p>
                    <p><strong>DNI:</strong> ${
                      this.payloadPayment?.client_info?.dni
                    }</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${
                      this.payloadPayment?.client_info?.birthdate
                    }</p>

                    <h3>Detalles del Pago:</h3>
                    <p><strong>Importe Pagado:</strong> €${
                      this.payloadPayment?.amount
                    }</p>

                    ${
                      this.event?.location === 'online'
                        ? `<h3>Detalles del Evento:</h3>
                          <p><strong>Ubicación:</strong> Online</p>
                          <p>Puedes acceder al evento en el siguiente enlace:</p>
                          <p><a href="${this.event?.url}" target="_blank">${this.event?.name}</a></p>`
                        : `<h3>Detalles del Evento:</h3>
                          <p><strong>Ubicación:</strong> presencial</p>
                          <p>Puedes acceder al evento en el siguiente enlace:</p>
                          <p><a href="${this.event?.url}" target="_blank">${this.event?.name}</a></p>`
                    }

                    <h3>Mensaje del Cliente:</h3>
                    <p>${this.payloadPayment?.client_info.message}</p>

                    <p>Gracias por confiar en nosotros para tu reserva. ¡Esperamos que disfrutes del evento!</p>
                  </div>
                  <div class="footer">
                    <p>Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
                    <p>&copy; 2024 Lazzaro. Todos los derechos reservados.</p>
                  </div>
                </div>
              </body>
              </html>
            `;

              let emailOrganizer = `<!DOCTYPE html>
                  <html lang="es">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lazzaro - Nueva Inscripción al Evento</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                      }
                      .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                        text-align: center;
                        padding-bottom: 20px;
                      }
                      .header h1 {
                        color: #333333;
                      }
                      .content {
                        line-height: 1.6;
                        color: #666666;
                      }
                      .content h2 {
                        color: #333333;
                        margin-bottom: 10px;
                      }
                      .content p {
                        margin: 5px 0;
                      }
                      .footer {
                        text-align: center;
                        padding-top: 20px;
                        color: #999999;
                        font-size: 12px;
                      }
                      .footer p {
                        margin: 5px 0;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                        <h1>Nueva Inscripción al Evento</h1>
                      </div>
                      <div class="content">
                        <h2>Hola, ${this.webConfig?.firstName} ${this.webConfig?.lastName}!</h2>
                        <p>Te informamos que un nuevo participante se ha registrado para tu evento.</p>

                        <h3>Detalles del Participante:</h3>
                        <p><strong>Nombre:</strong> ${this.payloadPayment?.client_info?.name}</p>
                        <p><strong>Email:</strong> ${this.payloadPayment?.client_info?.email}</p>
                        <p><strong>Teléfono:</strong> ${this.payloadPayment?.client_info?.phone}</p>
                        <p><strong>Mensaje del Participante:</strong> ${this.payloadPayment?.client_info?.message}</p>

                        <h3>Detalles del Evento:</h3>
                        <p><strong>Nombre del Evento:</strong> ${this.event?.name}</p>
                        <p><strong>Fecha del Evento:</strong> ${this.event?.dates?.event_start} -  ${this.event?.dates?.event_end}</p>
                        <p><strong>Ubicación:</strong> ${this.event?.location}</p>

                        <p>Gracias por organizar este evento. ¡Esperamos que sea todo un éxito!</p>
                      </div>
                      <div class="footer">
                        <p>Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
                        <p>&copy; 2024 Tu Lazzaro. Todos los derechos reservados.</p>
                      </div>
                    </div>
                  </body>
                  </html>
                  `;
              this.sweetAlertHelper.createCustomAlert({
                title: '¡Éxito!',
                text: 'El pago se ha realizado con éxito.',
                icon: 'success',
              });
              const sendBuyer: ISendMailPayload = {
                to: this.payloadPayment?.client_info?.email,
                subject: 'Lazzaro - Reserva exitosa',
                message: emailTemplateBuyer,
                from: this.webConfig?.email,
              };
              const sendOrganizer: ISendMailPayload = {
                to: this.webConfig?.email,
                subject: 'Lazzaro - Reserva exitosa',
                message: emailOrganizer,
                from: this.payloadPayment?.client_info?.email,
              };
              this.store.dispatch(new PostSendMailNoMessageAction(sendBuyer));
              this.store.dispatch(
                new PostSendMailNoMessageAction(sendOrganizer)
              );
            } else {
              this.sweetAlertHelper.createCustomAlert({
                title: '¡Éxito!',
                text: 'El pago se ha realizado con éxito. Ahora puedes agendar una cita.',
                icon: 'success',
              });
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
