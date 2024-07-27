export interface IServiceSection {
  id: string;
  websiteId: string;
  type: string;
  active: boolean;
  properties: IProperties;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  WebsiteId: string;
}

export interface IProperties {
  title: string;
  subtitle: string;
  background: string;
  titleColor: string;
  subtitleColor: string;
  cardsBackground: string;
}

export interface IService {
  id: string;
  member_id: string;
  service_name: string;
  description: string;
  image_url: string;
  payment_in_advance: boolean;
  price: number;
  calendly_url: string;
  createdAt: Date;
  updatedAt: Date;
  MemberId: string;
}
