import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import queryString from "query-string";
import { Ticket } from "../../lib/common";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const deleteItem = (url: string) => {
  return axios.delete(url);
};

const getCategories = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["category"],
    query: { is_active: true, is_deleted: false },
  });

  return axios.get(urlWithQueries);
};

const getTicketCatgories = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["ticket-category"],
    query: { is_active: true, is_deleted: false },
  });

  return axios.get(urlWithQueries);
};

const createTicket = (user_url: string, params: Ticket) => {
  const formData = new FormData();

  formData.append("user", user_url);
  formData.append("category", params.category);
  formData.append("title", params.title);
  formData.append("description", params.description);
  formData.append("is_active", true + "");

  return axios.post(api["ticket"], formData);
};

export { getCategories, deleteItem, getTicketCatgories, createTicket };
