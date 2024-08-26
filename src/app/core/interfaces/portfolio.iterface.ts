export interface IPortfolioSection {
  id: string;
  websiteId: string;
  type: string;
  active: boolean;
  properties: Properties;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  WebsiteId: string;
}

export interface Properties {
  title: string;
  subtitle: string;
  background: string;
  titleColor: string;
  subtitleColor: string;
  layout: String;
}

export interface IProject {
  id: string;
  member_id: string;
  status: string;
  title: string;
  description: string;
  skills: string;
  date: Date;
  image_url: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  MemberId: string;
}
