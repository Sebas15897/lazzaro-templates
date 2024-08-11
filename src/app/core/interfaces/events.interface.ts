export interface IEventsSection {
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
}

export interface IEvent {
  id: string;
  member_id: string;
  name: string;
  description: string;
  location: string;
  url: string;
  dates: Dates;
  tickets: Ticket[];
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  MemberId: string;
}

export interface Dates {
  event_end: Date;
  event_start: Date;
  inscription_end: Date;
  inscription_start: Date;
}

export interface Image {
  url: string;
  default: boolean;
}

export interface Ticket {
  name: string;
  price: string;
  amount: string;
}
