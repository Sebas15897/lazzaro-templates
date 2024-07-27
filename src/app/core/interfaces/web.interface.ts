export interface IWebSite {
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
  team: ITeam;
  style: IStyle;
  footer: IFooter;
  impact: IImpact;
  aboutUs: IAboutUs;
  contact: IContact;
  general: IGeneral;
  reviews: IReviews;
  bookings: IBookings;
  features: IPropertiesFeatures;
  homePage: IHomePage;
  whyChooseUs: IWhyChooseUs;
}

export interface IAboutUs {
  title: string;
  design: IAboutUsDesign;
  imgUrl: string;
  enabled: boolean;
  features: IAboutUsFeatures;
  subTitle: string;
  titleColor: string;
  description: string;
  subTitleColor: string;
}

export interface IAboutUsDesign {
  layout: string;
  backgroundColor: string;
}

export interface IAboutUsFeatures {
  icons: IIcon[];
  buttons: any[];
  enabled: boolean;
}

export interface IIcon {
  id?: number;
  url?: string;
  title: string;
  description: string;
}

export interface IBookings {
  title: string;
  design: IBookingsDesign;
  imgUrl: string;
  enabled: boolean;
  subTitle: string;
  subtitle: string;
  buttonUrl: string;
  buttonText: string;
  titleColor: string;
  subtitleColor: string;
}

export interface IBookingsDesign {
  layout: string;
  bannerColor: string;
  backgroundColor: string;
}

export interface IContact {
  title: string;
  design: IAboutUsDesign;
  subTitle: string;
  titleColor: string;
  subTitleColor: string;
}

export interface IPropertiesFeatures {
  icons: IIcon[];
  buttons: IButton[];
}

export interface IButton {
  id: number;
  link: string;
  text: string;
}

export interface IFooter {
  info: IInfo;
  design: IFooterDesign;
  social: ISocial;
}

export interface IFooterDesign {
  backgroundColor: string;
  backgroundImage: string;
}

export interface IInfo {
  terms: string;
  transparency: ITransparency;
}

export interface ITransparency {
  fileUrl: string;
  description: string;
  accountability: string;
}

export interface ISocial {
  twitter: string;
  facebook: string;
  linkedIn: string;
  whatsapp: string;
  instagram: string;
  secondaryWeb: string;
}

export interface IGeneral {
  url: string;
  active: boolean;
}

export interface IHomePage {
  title: string;
  design: IHomePageDesign;
  subTitle: string;
  mainImage: string;
  moreImages: any[];
  titleColor: string;
  subTitleColor: string;
  firstButtonLink: string;
  firstButtonText: string;
  firstButtonColor: string;
  secondButtonLink: string;
  secondButtonText: string;
  secondButtonColor: string;
}

export interface IHomePageDesign {
  layout: string;
  backgoundColor: string;
  backgroundColor: string;
}

export interface IImpact {
  data: IDatum[];
  design: IImpactDesign;
  enabled: boolean;
}

export interface IDatum {
  id: string;
  url: string;
  text: string;
  amount: string;
}

export interface IImpactDesign {
  color: string;
  amountColor: string;
  cardTextColor: string;
  backgoundColor: string;
  backgoundImage: string;
  backgroundColor: string;
  backgroundImage: string;
  cardAmountColor: string;
}

export interface IReviews {
  url: string;
  title: string;
  enabled: boolean;
  subTitle: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
}

export interface IStyle {
  logo: string;
  text: string;
  type: string;
  menuColor: string;
  buttonColor: string;
  footerColor: string;
  menuTextColor: string;
  mainTypography: string;
  mainTypographry: string;
  secondaryTypography: string;
}

export interface ITeam {
  title: string;
  design: ITeamDesign;
  enabled: boolean;
  members: IMember[];
  subTitle: string;
  titleColor: string;
  subtitleColor: string;
}

export interface ITeamDesign {
  backgroundColor: string;
}

export interface IMember {
  id: number;
  name: string;
  picture: string;
  linkedin: string;
  position: string;
}

export interface IWhyChooseUs {
  title: string;
  design: IHomePageDesign;
  imgUrl: string;
  enabled: boolean;
  subTitles: IIcon[];
  subtitles: IIcon[];
  titleColor: string;
  description: string;
}
