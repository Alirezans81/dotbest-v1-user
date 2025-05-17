import { WeekDay } from "./datetime";

export type Salon = {
  url: string;
  manager: string;
  rate: number;
  order_comment_quantity: number;
  poster: File | null;
  poster_url: string;
  rental_contract: File | null;
  rental_contract_url: string;
  business_license: File | null;
  business_license_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  name: string;
  phone: string;
  is_verified: boolean;
  datetime_verify: string;
  summery: string;
  address: string;
};
export const defaultSalon: Salon = {
  url: "",
  manager: "",
  rate: 0,
  order_comment_quantity: 0,
  poster: null,
  poster_url: "",
  business_license: null,
  rental_contract_url: "",
  rental_contract: null,
  business_license_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  name: "",
  phone: "",
  is_verified: false,
  datetime_verify: "",
  summery: "",
  address: "",
};

export type SalonBarber = {
  url: string;
  barber_detail: {
    nickname: string;
    order_comment_quantity: number;
    poster_url: string;
    rate: number;
    slug: string;
    url: string;
  };
  salon_detail: {
    name: string;
    order_comment_quantity: number;
    poster_url: string;
    rate: number;
    url: string;
  };
  salon: string;
  barber: string;
  rate: number;
  order_comment_quantity: string;
  working_days: WeekDay[];
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  working_time_start: string;
  working_time_end: string;
};
export const defaultSalonBarber: SalonBarber = {
  url: "",
  barber_detail: {
    nickname: "",
    order_comment_quantity: 0,
    poster_url: "",
    rate: 0,
    slug: "",
    url: "",
  },
  salon_detail: {
    name: "",
    order_comment_quantity: 0,
    poster_url: "",
    rate: 0,
    url: "",
  },
  salon: "",
  barber: "",
  rate: 0,
  order_comment_quantity: "",
  working_days: [],
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: true,
  show_order: 1,
  working_time_start: "",
  working_time_end: "",
};

export type SalonPlan = {
  url: string;
  salon: string;
  salon_name: string;
  poster_url: string;
  rate: string;
  plan_comment_quantity: string;
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
};
export const defaultSalonPlan: SalonPlan = {
  url: "",
  salon: "",
  salon_name: "",
  poster_url: "",
  rate: "",
  plan_comment_quantity: "",
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
};

export type SalonPlanComment = {
  url: string;
  parent: string;
  plan: string;
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
  rate: number;
  message: string;
  is_pin: boolean;
};
export const defaultSalonPlanComment: SalonPlanComment = {
  url: "",
  parent: "",
  plan: "",
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
  rate: 0,
  message: "",
  is_pin: false,
};

export type SalonPlanCommentVote = {
  url: string;
  comment_plan: string;
  user: string;
  slug: string;
  value: boolean;
};
export const defaultSalonPlanCommentVote: SalonPlanCommentVote = {
  url: "",
  comment_plan: "",
  user: "",
  slug: "",
  value: false,
};

export type SalonPlanDetail = {
  url: string;
  plan: string;
  skill: string;
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
  duration: string;
  price: string;
  summery: string;
};
export const defaultSalonPlanDetail: SalonPlanDetail = {
  url: "",
  plan: "",
  skill: "",
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
  duration: "",
  price: "",
  summery: "",
};

export type SalonSocialMedia = {
  url: string;
  salon: string;
  social_network: string;
  social_link: string;
  social_network_logo_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  username: string;
};
export const defaultSalonSocialMedia: SalonSocialMedia = {
  url: "",
  salon: "",
  social_network: "",
  social_link: "",
  social_network_logo_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  username: "",
};

export type Comment = {
  url: string;
  order_detail: string;
  user: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  rate: number;
  like: number;
  dislike: number;
  message: string;
  is_anonymous_user: boolean;
};
export const defaultComment: Comment = {
  url: "",
  order_detail: "",
  user: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  rate: 0,
  like: 0,
  dislike: 0,
  message: "",
  is_anonymous_user: false,
};
