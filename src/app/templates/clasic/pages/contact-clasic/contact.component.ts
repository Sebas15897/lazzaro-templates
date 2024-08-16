import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IContact } from '../../../../core/interfaces/web.interface';
import { WebState } from '../../../../core/store/web/web.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostSendMailAction } from '../../../../core/store/contact/contact.actions';
import { IWebConfig } from '../../../../core/interfaces/web-config.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})

export class ContactComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  contact$: Observable<IContact> = new Observable();
  webConfig$: Observable<IWebConfig> = new Observable();
  isMailSend$: Observable<boolean> = new Observable();

  formContact: FormGroup;

  contact: IContact;

  constructor(private store: Store, private fb: FormBuilder) {
    this.contact$ = this.store.select(WebState.contact);
    this.webConfig$ = this.store.select(WebState.webConfig);
    this.formContact = this.createForm();
  }

  ngOnInit() {
    this.subscribeState();
    this.subscribeForm();
  }

  subscribeState() {
    this.contact$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.contact = resp;
    });

    this.webConfig$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.formContact.get('to')?.setValue(resp.email);
      }
    });

    this.isMailSend$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.formContact.reset();
      }
    });
  }

  subscribeForm() {
    this.formContact.get('asunto').valueChanges.subscribe((value) => {
      if (value) {
        const subject = `Contacto - ${value} - Lazzaro Emprende`;
        this.formContact?.get('subject')?.setValue(subject);
      } else {
        this.formContact?.get('subject')?.setValue(null);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      from: [null, [Validators.required, Validators.email]],
      message: [null, Validators.required],
      subject: [null, Validators.required],
      asunto: [null, Validators.required],
      to: [null, Validators.required],
    });
  }

  sendMail() {
    const form = Object.assign({}, this.formContact.getRawValue());
    delete form.asunto;
    this.store.dispatch(new PostSendMailAction(form));
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
