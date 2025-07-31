import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import { Order, OrderComment, User } from "../../lib/common";
import queryString from "query-string";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

export const updatePersonlInfo = (user_url: string, params: User) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);

  return axios.patch(user_url, formData);
};

export const getReports = (token: string, username: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["order"],
    query: { is_deleted: false, user: username },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const updateAvatar = (user_url: string, file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  return axios.patch(user_url, formData);
};

export const likeComment = (comment_url: string, like_count: number) => {
  const formData = new FormData();

  formData.append("like", like_count + "");

  return axios.patch(comment_url, formData);
};

export const dislikeComment = (comment_url: string, dislike_count: number) => {
  const formData = new FormData();

  formData.append("dislike", dislike_count + "");

  return axios.patch(comment_url, formData);
};

export const createOrder = (token: string, order: Order) => {
  const formData = new FormData();

  formData.append("customer", order.customer);
  formData.append("service", order.service);
  order.image && formData.append("image", order.image);
  formData.append("datetime_request", order.datetime_request);
  formData.append("date", order.date);
  formData.append("time", order.time);
  formData.append("description", order.description);
  formData.append("status", order.status);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["order"], formData, { headers });
};

export const changeOrderStatus = (
  token: string,
  order_slug: string,
  status: Order["status"]
) => {
  const formData = new FormData();

  formData.append("status", status);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(api["order"] + order_slug + "/", formData, { headers });
};

export const getBarberSerivce = (token: string, service_url: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(service_url, { headers });
};

export const getOrderUserComments = (
  token: string,
  order_slug: string,
  username: string
) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["comment"],
    query: { is_deleted: false, user: username, order: order_slug },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const createOrderComment = (token: string, data: OrderComment) => {
  const formData = new FormData();

  formData.append("user", data.user);
  formData.append("order", data.order);
  formData.append("message", data.message);
  formData.append("rate", data.rate + "");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["comment"], formData, { headers });
};
