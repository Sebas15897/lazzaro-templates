import { IPayloadContact } from '../../interfaces/contact.interface';

export class PostSendMailAction {
  static readonly type = '[Templates - contact] Post send mail action';
  constructor(public payload: IPayloadContact) {}
}

export class PostSendMailNoMessageAction {
  static readonly type =
    '[Templates - contact] Post send mail action no message';
  constructor(public payload: IPayloadContact) {}
}
