export type WeekDay =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type TimeSlot = {
  date: string;
  day: WeekDay;
  slots: string[];
};

export const monthes = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const getMonthNumber = (value: string) => {
  return monthes.findIndex((e) => e === value) + 1;
};
