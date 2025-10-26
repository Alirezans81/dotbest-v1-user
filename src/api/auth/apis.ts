import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import { User } from "../../lib/common";
import { UserInitParams } from "../../lib/user";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

export const sendCode = (phone: string) => {
  const formData = new FormData();

  formData.append("phone", phone);

  return axios.post(api["send-code"], formData);
};

export const register = (phone: string, userParams: User) => {
  const formData = new FormData();

  formData.append("phone", phone);
  formData.append("account_type", userParams.account_type);
  formData.append("first_name", userParams.first_name);
  formData.append("last_name", userParams.last_name);
  formData.append("birthday", userParams.birth_date);
  formData.append("national_code", userParams.national_code);

  return axios.post(api["register"], formData);
};

export const verifyCode = (phone: string, code: string) => {
  const formData = new FormData();

  formData.append("phone", phone);
  formData.append("code", code);

  return axios.post(api["verify-code"], formData);
};

export const refreshAccessToken = (refresh_token: string) => {
  const formData = new FormData();

  formData.append("refresh", refresh_token);

  return axios.post(api["refresh"], formData);
};

export const getUserData = (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(api["user"], { headers });
};

export const getPersonalInfo = (data: UserInitParams) => {
  const zohal_token = process.env.REACT_APP_ZOHAL_TOKEN;
  const headers = {
    Authorization: `Bearer ${zohal_token}`,
  };

  const { birthday_year, birthday_month, birthday_day, melli_code } = data;

  return axios.post(
    "https://service.zohal.io/api/v0/services/inquiry/national_identity_inquiry",
    {
      gender: true,
      birth_date: birthday_year + "/" + birthday_month + "/" + birthday_day,
      national_code: melli_code,
    },
    { headers }
  );
};
