import { ICreateOrderPayload } from '../../interfaces/shop.interface';

export class GetShopSection {
  static readonly type = '[Shop] Get Shop Section';
  constructor(public payload: string) {}
}

export class getAllProducts {
  static readonly type = '[Shop] Get All Products';
  constructor(public payload: string) {}
}

export class PostCreateOrderAction {
  static readonly type = '[Shop] Post Create Order';
  constructor(public payload: ICreateOrderPayload) {}
}
