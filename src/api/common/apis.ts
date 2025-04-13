import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import queryString from "query-string";
import { Ticket } from "../../lib/common";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

export const deleteItem = (token: string, url: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(url, { headers });
};

export const getCategories = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["category"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getTicketCatgories = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket-category"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const createTicket = (
  token: string,
  user_url: string,
  params: Ticket
) => {
  const formData = new FormData();

  formData.append("user", user_url);
  formData.append("category", params.category);
  formData.append("title", params.title);
  formData.append("description", params.description);
  formData.append("is_active", true + "");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["ticket"], formData, { headers });
};

export const getWallet = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};
