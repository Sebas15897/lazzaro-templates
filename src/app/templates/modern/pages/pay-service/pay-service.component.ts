import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IService } from '../../../../core/interfaces/services.interface';
import { ServicesState } from '../../../../core/store/services/services.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ClearStrippePaymentAction, PostPaymentAction } from '../../../../core/store/payment/payment.actions';
import { IPaymentResponse } from '../../../../core/interfaces/payment.interface';
import { PaymentState } from '../../../../core/store/payment/payment.state';

@Component({
  selector: 'app-pay-service',
  templateUrl: './pay-service.component.html',
  styleUrls: ['./pay-service.component.scss'],
})
export class PayServiceComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listServices$: Observable<IService[]> = new Observable();
  payResponse$: Observable<IPaymentResponse> = new Observable();
  payStripeSuccess$: Observable<boolean> = new Observable();

  serviceId: string;
  service: IService;
  activeTab: string = 'pago';
  sanitizedCalendlyUrl: SafeResourceUrl;
  isPaySuccess: boolean = false;
  isShowStripe: boolean = false;
  payment_in_advance: boolean = false;

  formPayService: FormGroup;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.listServices$ = this.store.select(ServicesState.ListAllServices);
    this.payResponse$ = this.store.select(PaymentState.GetPaymentResponse);
    this.payStripeSuccess$ = this.store.select(PaymentState.SuccesStripePayment);
    this.serviceId = this.activatedRoute.snapshot.params['serviceId'];
    this.formPayService = this.createForm();
  }

  ngOnInit() {
    this.subscribeState();
    this.subscribeForm();
  }

  subscribeForm() {
    this.formPayService
      ?.get('client_info')
      ?.get('fistName')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      ?.subscribe((value) => {
        const lastName = this.formPayService
          ?.get('client_info')
          ?.get('lastName').value;

        this.formPayService
          ?.get('client_info')
          ?.get('name')
          .setValue(`${value} ${lastName}`);
      });

    this.formPayService
      ?.get('client_info')
      ?.get('lastName')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      ?.subscribe((value) => {
        const fistName = this.formPayService
          ?.get('client_info')
          ?.get('fistName').value;

        this.formPayService
          ?.get('client_info')
          ?.get('name')
          .setValue(`${fistName} ${value}`);
      });
  }

  subscribeState() {
    this.listServices$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.service = resp.find((service) => service?.id === this.serviceId);
        this.sanitizedCalendlyUrl = this.sanitizeUrl(
          this.service?.calendly_url
        );
        this.payment_in_advance = this.service?.payment_in_advance;
        if (this.payment_in_advance) {
          this.activeTab = 'pago';
        } else {
          this.activeTab = 'cita';
        }
        this.formPayService.patchValue({
          serviceId: this.service?.id,
          member_id: this.service?.member_id,
          amount: this.service?.price,
        });
      }
    });

    this.payResponse$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.isShowStripe = true;
      }
    });

    this.payStripeSuccess$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.activeTab = 'cita';
        this.isPaySuccess = resp;
      }
    });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  createForm(): FormGroup {
    return this.fb.group({
      member_id: null,
      client_info: this.fb.group({
        fistName: [null, Validators.required],
        lastName: [null, Validators.required],
        name: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        phone: null,
        address: null,
        dni: null,
        birthdate: [null, [Validators.required]],
        postal_code: null,
        city: [null, [Validators.required]],
        country: [null, [Validators.required]],
        message: null,
      }),
      amount: 0,
      entityType: 'Service',
      productId: null,
      serviceId: null,
      eventId: null,
      policy: [null, Validators.required],
    });
  }

  setActiveTab(tabName: string) {
    if (tabName === 'cita' && !this.isPaySuccess) {
      return;
    }
    if (tabName === 'pago' && this.isPaySuccess) {
      return;
    }
    this.activeTab = tabName;
  }

  payService() {
    const form = Object.assign({}, this.formPayService.getRawValue());
    delete form.policy;
    delete form.client_info.fistName;
    delete form.client_info.lastName;
    this.store.dispatch(new PostPaymentAction(form));
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearStrippePaymentAction());
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
