import { Salon } from "./salon";

export type User = {
  url: string;
  username: string;
  code: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: "male" | "female" | "not_selected";
  account_type: "salon" | "clinic" | "assistant" | "customer" | "not_selected";
  national_code: string;
  birth_date: string;
  date_joined: string;
  avatar_url: string;
  is_staff: boolean;
  is_ban: boolean;
  salons: Salon[];
  barbers: any[];
  is_active: boolean;
};
export const defaultUser: User = {
  url: "",
  username: "",
  code: "",
  first_name: "",
  last_name: "",
  phone: "",
  gender: "female",
  account_type: "not_selected",
  national_code: "",
  birth_date: "",
  date_joined: "",
  avatar_url: "",
  is_staff: false,
  is_ban: false,
  salons: [],
  barbers: [],
  is_active: true,
};

export type Category = {
  url: string;
  parent: string;
  image: File | null;
  image_url: string;
  has_children: boolean;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
};
export const defaultCategory: Category = {
  url: "",
  parent: "",
  image: null,
  image_url: "",
  has_children: false,
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
};

export type News = {
  url: string;
  categories: Category[];
  poster_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
  status: string;
  summery: string;
  visits: number;
  is_special: boolean;
  font_size: number;
  font_family_name: string;
  font_color_1: string;
  font_color_2: string;
  keywords: string;
};
export const defaultNews: News = {
  url: "",
  categories: [],
  poster_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
  status: "",
  summery: "",
  visits: 0,
  is_special: false,
  font_size: 0,
  font_family_name: "",
  font_color_1: "",
  font_color_2: "",
  keywords: "",
};

export type NewsCategory = {
  url: string;
  image_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
  alt_image_name: string;
};
export const defaultNewsCategory: NewsCategory = {
  url: "",
  image_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
  alt_image_name: "",
};

export type NewsComment = {
  url: string;
  parent: string;
  news: string;
  user: string;
  like: string;
  dislike: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  message: string;
  is_pin: boolean;
};
export const defaultNewsComment: NewsComment = {
  url: "",
  parent: "",
  news: "",
  user: "",
  like: "",
  dislike: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  message: "",
  is_pin: false,
};

export type NewsCommentVote = {
  url: string;
  news_comment: string;
  user: string;
  slug: string;
  value: boolean;
};
export const defaultNewsCommentVote: NewsCommentVote = {
  url: "",
  news_comment: "",
  user: "",
  slug: "",
  value: false,
};

export type NewsDetail = {
  url: string;
  news: string;
  image_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
  summery: string;
  font_size: number;
  font_family_name: string;
  font_color_1: string;
  font_color_2: string;
};
export const defaultNewsDetail: NewsDetail = {
  url: "",
  news: "",
  image_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
  summery: "",
  font_size: 0,
  font_family_name: "",
  font_color_1: "",
  font_color_2: "",
};

export type Order = {
  url: string;
  customer: string;
  service: string;
  customer_username: string;
  customer_full_name: string;
  service_title: string;
  image: File | null;
  image_url: string;
  slug: string;
  date: string;
  time: string;
  duration: string;
  discount: number;
  status:
    | "request"
    | "rejected"
    | "awaiting_payment"
    | "reserved"
    | "admin_canceled"
    | "barber_canceled"
    | "customer_canceled"
    | "completed";
  final_price: string;
  datetime_request: string;
  datetime_update: string;
  datetime_payment: string;
  datetime_done: string;
  description: string;
  cancel_description: string;
  admin_description: string;
};
export const defaultOrder: Order = {
  url: "",
  customer: "",
  service: "",
  customer_username: "",
  customer_full_name: "",
  service_title: "",
  image: null,
  image_url: "",
  slug: "",
  date: "",
  time: "",
  duration: "",
  discount: 0,
  status: "request",
  final_price: "",
  datetime_request: "",
  datetime_update: "",
  datetime_payment: "",
  datetime_done: "",
  description: "",
  cancel_description: "",
  admin_description: "",
};

export type OrderCommentCategoryDetail = {
  url: string;
  parent_detail: OrderCommentCategoryDetail | null;
  title: string;
  image_url: string;
};
export type OrderComment = {
  url: string;
  order: string;
  customer: string;
  customer_detail: {
    url: string;
    first_name: string;
    last_name: string;
    phone: string;
    full_name: string;
    avatar_url: string;
  };
  barber_detail: {
    url: string;
    first_name: string;
    last_name: string;
    phone: string;
    full_name: string;
    avatar_url: string;
  };
  category_detail: OrderCommentCategoryDetail;
  image_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  rate: number;
  alt_image: string;
  message: string;
  is_pin: boolean;
};
export const defaultOrderComment: OrderComment = {
  url: "",
  order: "",
  customer: "",
  customer_detail: {
    url: "",
    first_name: "",
    last_name: "",
    phone: "",
    full_name: "",
    avatar_url: "",
  },
  barber_detail: {
    url: "",
    first_name: "",
    last_name: "",
    phone: "",
    full_name: "",
    avatar_url: "",
  },
  category_detail: {
    image_url: "",
    parent_detail: null,
    title: "",
    url: "",
  },
  image_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  rate: 0,
  alt_image: "",
  message: "",
  is_pin: false,
};

export type SocialNetwork = {
  url: string;
  logo_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
  link: string;
  logo_name: string;
};
export const defaultSocialNetwork: SocialNetwork = {
  url: "",
  logo_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
  link: "",
  logo_name: "",
};

export type Ticket = {
  url: string;
  user: string;
  category: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
  status: string;
};
export const defaultTicket: Ticket = {
  url: "",
  user: "",
  category: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
  status: "",
};

export type TicketCategory = {
  url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  title: string;
};
export const defaultTicketCategory: TicketCategory = {
  url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  title: "",
};

export type TicketDetail = {
  url: string;
  user: string;
  ticket: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  message: string;
  file: string;
  is_admin: boolean;
};
export const defaultTicketDetail: TicketDetail = {
  url: "",
  user: "",
  ticket: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  message: "",
  file: "",
  is_admin: false,
};

export type Wallet = {
  url: string;
  user: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  balance: string;
  pending: string;
  locked: string;
};
export const defaultWallet: Wallet = {
  url: "",
  user: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  balance: "",
  pending: "",
  locked: "",
};

export type Withdrawal = {
  url: string;
  wallet: string;
  wallet_card: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  amount: string;
  status: string;
  datetime_payment: string;
  order: string;
};
export const defaultWithdrawal: Withdrawal = {
  url: "",
  wallet: "",
  wallet_card: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  amount: "",
  status: "",
  datetime_payment: "",
  order: "",
};
