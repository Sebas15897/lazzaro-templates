export interface IShop {
  id: string;
  member_id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  default_img: string;
  discount: number;
  delivery_time: string;
  active: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  MemberId: string;
}

export interface IShopSection {
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
}
