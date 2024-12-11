import { Salon } from "./salon";

type CommonUser = {
  url: string;
  username: string;
  code: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: "male" | "female" | "not_selected";
  account_type: "salon" | "clinic" | "assistant" | "customer" | "not_selected";
  date_joined: string;
  avatar_url: string;
  is_staff: boolean;
  is_ban: boolean;
  salons: Salon[];
  barbers: any[];
  is_active: boolean;
};
const defaultUser: CommonUser = {
  url: "",
  username: "",
  code: "",
  first_name: "",
  last_name: "",
  phone: "",
  gender: "female",
  account_type: "salon",
  date_joined: "",
  avatar_url: "",
  is_staff: false,
  is_ban: false,
  salons: [],
  barbers: [],
  is_active: true,
};

type Category = {
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
const defaultCategory: Category = {
  url: "",
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: false,
  show_order: 1,
  title: "",
};

type Reservation = {
  url: string;
  user: string;
  salon: string;
  skill: string;
  total_price: number;
  datetime_update: string;
  datetime_delete: string;
  is_deleted: boolean;
  description: string;
  slug: string;
  datetime_create: string;
  is_active: boolean;
  status:
    | "request"
    | "accept"
    | "awaiting_payment"
    | "is_paid"
    | "cancel"
    | "done";
  datetime_request: string;
  datetime_payment: string;
  datetime_done: string;
  final_price: number;
  cancel_description: string;
};
const defaultReservation: Reservation = {
  url: "",
  user: "",
  salon: "",
  skill: "",
  total_price: 0,
  datetime_update: "",
  datetime_delete: "",
  is_deleted: false,
  description: "",
  slug: "",
  datetime_create: "",
  is_active: true,
  status: "request",
  datetime_request: "",
  datetime_payment: "",
  datetime_done: "",
  final_price: 0,
  cancel_description: "",
};

export type { CommonUser, Category, Reservation };
export { defaultUser, defaultCategory, defaultReservation };
