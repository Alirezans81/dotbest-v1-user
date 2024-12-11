type UserInitParams = {
  phone: string;
  name: string;
  melli_code: string;
  birthday_year: string;
  birthday_month: string;
  birthday_day: string;
};
const defaultUserInitParams: UserInitParams = {
  phone: "",
  name: "",
  melli_code: "",
  birthday_year: "",
  birthday_month: "",
  birthday_day: "",
};

export type { UserInitParams };
export { defaultUserInitParams };
