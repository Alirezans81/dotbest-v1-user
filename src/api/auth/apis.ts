import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import { CreateParams } from "../../lib/interfaces";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const sendCode = (phone: string) => {
  const formData = new FormData();

  formData.append("phone", phone);

  return axios.post(api["send-code"], formData);
};

const verifyCode = (code: string) => {
  const formData = new FormData();

  formData.append("code", code);

  return axios.post(api["verify-code"], formData);
};

const create = ({ phone, first_name, last_name, salon_name }: CreateParams) => {
  const formData = new FormData();

  formData.append("phone", phone);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("salon_name", salon_name);

  return axios.post(api["create"], formData);
};

const getUserData = (user_url: string) => {
  return axios.get(user_url);
};

export { sendCode, verifyCode, create, getUserData };
