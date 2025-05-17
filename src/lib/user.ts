import { User } from "./common";

type UserInitParams = {
  phone: string;
  first_name: string;
  last_name: string;
  melli_code: string;
  birthday_year: string;
  birthday_month: string;
  birthday_day: string;
  account_type: User["account_type"];
};
const defaultUserInitParams: UserInitParams = {
  phone: "",
  first_name: "",
  last_name: "",
  melli_code: "",
  birthday_year: "",
  birthday_month: "",
  birthday_day: "",
  account_type: "not_selected",
};

export type { UserInitParams };
export { defaultUserInitParams };
