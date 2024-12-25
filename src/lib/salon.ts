type Salon = {
  url: string;
  manager: string;
  categories: string[];
  rate: number;
  comment_quantity: number;
  poster_url: string;
  rental_contract_url: string;
  business_license_url: string;
  national_card_url: string;
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
  national_card_code: string;
  is_verified: boolean;
  datetime_verify: string;
  summery: string;
  address: string;
};
const defaultSalon: Salon = {
  url: "",
  manager: "",
  categories: [],
  rate: 0,
  comment_quantity: 0,
  poster_url: "",
  rental_contract_url: "",
  business_license_url: "",
  national_card_url: "",
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
  national_card_code: "",
  is_verified: false,
  datetime_verify: "",
  summery: "",
  address: "",
};

type Service = {
  url: string;
  salon: string;
  category: string;
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
};
const defaultService: Service = {
  url: "",
  salon: "",
  category: "",
  poster_url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: true,
  show_order: 1,
  title: "",
};

type WeekDay =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";
type Barber = {
  url: string;
  user: string;
  salon: string;
  salon_name: string;
  rate: number;
  comment_quantity: number;
  poster_url: string;
  working_days: WeekDay[];
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  nick_name: string;
  working_time_start: string;
  working_time_end: string;
};
const defaultBarber: Barber = {
  url: "",
  user: "",
  salon: "",
  salon_name: "",
  rate: 0,
  comment_quantity: 0,
  poster_url: "",
  working_days: [],
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: true,
  show_order: 1,
  nick_name: "",
  working_time_start: "",
  working_time_end: "",
};

type Photo = {
  url: string;
  barber: string;
  order: string;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  show_order: number;
  image: string;
  alt_name: string;
  like: number;
  dislike: number;
};
const defaultPhoto: Photo = {
  url: "",
  barber: "",
  order: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 0,
  image: "",
  alt_name: "",
  like: 0,
  dislike: 0,
};

export type { Salon, Service, Barber, WeekDay, Photo };
export { defaultSalon, defaultService, defaultBarber, defaultPhoto };
