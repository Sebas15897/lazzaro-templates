export interface IWebConfig {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
  cif: string;
  gender: string;
  address: null;
  websiteId: string;
  dni: string;
  tools: string[];
  url: string;
  mobilePhone: string;
  zohoId: string;
  currency: string;
  currencySymbol: string;
  recoverHash: null;
  recoverDate: null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  isActive: boolean;
  stripe_account_id: string;
  deletedAt: null;
  SubscriptionMembershipId: null;
}
