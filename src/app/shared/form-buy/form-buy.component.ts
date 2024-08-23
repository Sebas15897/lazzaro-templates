import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormHeaderComponent } from '../../core/components/form-header/form-header.component';
import { Store } from '@ngxs/store';
import { PostPaymentAction } from '../../core/store/payment/payment.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IShop } from '../../core/interfaces/shop.interface';
import { ShopState } from '../../core/store/shop/shop.store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPaymentResponse } from '../../core/interfaces/payment.interface';
import { StripeComponent } from '../stripe/stripe.component';
import { PaymentState } from '../../core/store/payment/payment.state';
import { WebState } from '../../core/store/web/web.state';
import { getAllProducts } from '../../core/store/shop/shop.actions';

@Component({
  selector: 'app-form-buy',
  templateUrl: './form-buy.component.html',
  styleUrls: ['./form-buy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormHeaderComponent,
    StripeComponent,
  ],
})
export class FormBuyComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  listProducts$: Observable<IShop[]> = new Observable();
  payResponse$: Observable<IPaymentResponse> = new Observable();
  payStripeSuccess$: Observable<boolean> = new Observable();

  formPayProduct: FormGroup;

  productId: string;
  product: IShop;

  isShowStripe: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<FormBuyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.formPayProduct = this.createForm();
    this.listProducts$ = this.store.select(ShopState.ListAllProducts);
    this.payResponse$ = this.store.select(PaymentState.GetPaymentResponse);
    this.payStripeSuccess$ = this.store.select(
      PaymentState.SuccesStripePayment
    );
    this.productId = this.data;
  }

  ngOnInit() {
    this.subscribeState();
    this.subscribeForm();
  }

  subscribeForm() {
    this.formPayProduct
      ?.get('client_info')
      ?.get('fistName')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      ?.subscribe((value) => {
        const lastName = this.formPayProduct
          ?.get('client_info')
          ?.get('lastName').value;

        this.formPayProduct
          ?.get('client_info')
          ?.get('name')
          .setValue(`${value} ${lastName}`);
      });

    this.formPayProduct
      ?.get('client_info')
      ?.get('lastName')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      ?.subscribe((value) => {
        const fistName = this.formPayProduct
          ?.get('client_info')
          ?.get('fistName').value;

        this.formPayProduct
          ?.get('client_info')
          ?.get('name')
          .setValue(`${fistName} ${value}`);
      });
  }

  subscribeState() {
    this.listProducts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.product = resp.find((product) => product?.id === this.productId);
        this.formPayProduct.patchValue({
          productId: this.product?.id,
          member_id: this.product?.member_id,
          amount: this.product?.price,
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
        const webId = this.store.selectSnapshot(WebState.webConfig)?.id;
        this.store.dispatch(new getAllProducts(webId));
        this.dialogRef.close(true);
      }
    });
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
      entityType: 'Product',
      productId: null,
      serviceId: null,
      eventId: null,
      policy: [null, Validators.required],
    });
  }

  payProduct() {
    const form = Object.assign({}, this.formPayProduct.getRawValue());
    delete form.policy;
    delete form.client_info.fistName;
    delete form.client_info.lastName;
    this.store.dispatch(new PostPaymentAction(form));
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
