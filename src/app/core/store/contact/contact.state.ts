import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { ContactService } from '../../services/contact/contact.service';
import { PostSendMailAction, PostSendMailNoMessageAction } from './contact.actions';
import { SweetAlertHelper } from '../../config/sweet-alert/sweet-alert.helper';

export interface ContactStateModel {
  isSendMail: boolean;
}

@State<ContactStateModel>({
  name: 'contact',
  defaults: {
    isSendMail: null,
  },
})

@Injectable()
export class ContactState {
  @Selector() static isMailSend(state: ContactStateModel): boolean {
    return state?.isSendMail ?? false;
  }

  constructor(
    private contactService: ContactService,
    private sweetAlertHelper: SweetAlertHelper
  ) {}

  @Action(PostSendMailAction)
  PostSendMailAction(
    ctx: StateContext<ContactStateModel>,
    { payload }: PostSendMailAction
  ) {
    return this.contactService.postSendMail(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            this.sweetAlertHelper.createCustomAlert({
              title: '¡Éxito!',
              text: 'Tu mensaje ha sido enviado exitosamente!',
              icon: 'success',
            });
            ctx.patchState({
              isSendMail: true,
            });
          }
        },
      })
    );
  }

  @Action(PostSendMailNoMessageAction)
  PostSendMailNoMessageAction(
    ctx: StateContext<ContactStateModel>,
    { payload }: PostSendMailNoMessageAction
  ) {
    return this.contactService.postSendMail(payload).pipe(
      tap({
        next: (resp) => {
          if (resp) {
            ctx.patchState({
              isSendMail: true,
            });
          }
        },
      })
    );
  }
}
