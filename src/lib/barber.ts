import { TimeSlot, WeekDay } from "./datetime";

export type ReservedOrder = {
  date: string;
  times: {
    [startTime: string]: {
      slug: string;
      duration: string;
    };
  };
}
export type Barber = {
  url: string;
  user: string;
  user_detail: {
    url: string;
    first_name: string;
    last_name: string;
    phone: string;
    full_name: string;
    avatar_url: string;
  };
  rate: string;
  order_comment_quantity: string;
  poster: File | null;
  poster_url: string;
  coordinate: string;
  salon_schedules: string;
  working_days: WeekDay[];
  available_date_slots: TimeSlot[];
  reserved_orders: ReservedOrder[];
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  nickname: string;
  working_time_start: string;
  working_time_end: string;
  address: string;
  latitude: number;
  longitude: number;
  default_duration_minutes: string;
  has_advanced_schedule: boolean;
};
export const defaultBarber: Barber = {
  url: "",
  user: "",
  user_detail: {
    url: "",
    first_name: "",
    last_name: "",
    phone: "",
    full_name: "",
    avatar_url: "",
  },
  rate: "",
  order_comment_quantity: "",
  poster: null,
  poster_url: "",
  coordinate: "",
  salon_schedules: "",
  working_days: [],
  available_date_slots: [],
  reserved_orders: [],
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  nickname: "",
  working_time_start: "",
  working_time_end: "",
  address: "",
  latitude: 0,
  longitude: 0,
  default_duration_minutes: "",
  has_advanced_schedule: false,
};

export type BarberWorkingHour = {
  url: string;
  barber: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  day_of_week: WeekDay;
  start_time: string;
  end_time: string;
};
export const defaultBarberWorkingHour: BarberWorkingHour = {
  url: "",
  barber: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  day_of_week: "saturday",
  start_time: "",
  end_time: "",
};

export type BarberService = {
  url: string;
  barber: string;
  category: string;
  poster: File | null;
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
};
export const defaultBarberService: BarberService = {
  url: "",
  barber: "",
  category: "",
  poster: null,
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
};

export type BarberCategoryGallery = {
  url: string;
  barber: string;
  category: string;
  image_url: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  alt_image_name: string;
};
export const defaultBarberCategoryGallery: BarberCategoryGallery = {
  url: "",
  barber: "",
  category: "",
  image_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  alt_image_name: "",
};

export type BarberCategoryGalleryComment = {
  url: string;
  parent: string;
  barber_category_gallery: string;
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
export const defaultBarberCategoryGalleryComment: BarberCategoryGalleryComment =
  {
    url: "",
    parent: "",
    barber_category_gallery: "",
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

export type BarberCategoryGalleryCommentVote = {
  url: string;
  comment_barber_category_gallery: string;
  user: string;
  slug: string;
  value: boolean;
};
export const defaultBarberCategoryGalleryCommentVote: BarberCategoryGalleryCommentVote =
  {
    url: "",
    comment_barber_category_gallery: "",
    user: "",
    slug: "",
    value: false,
  };

export type BarberSocialMedia = {
  url: string;
  barber: string;
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
export const defaultBarberSocialMedia: BarberSocialMedia = {
  url: "",
  barber: "",
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
