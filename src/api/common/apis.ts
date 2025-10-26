import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import queryString from "query-string";
import { Ticket, WalletCard, Withdrawal } from "../../lib/common";

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
    query: { is_active: true, is_deleted: false, limit: 500 },
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

export const getWalletCards = (token: string, search?: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["wallet-card"],
    query: { is_active: true, is_deleted: false, search },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const createWalletCard = (token: string, data: WalletCard) => {
  const formData = new FormData();

  formData.append("card_number", data.card_number);
  formData.append("shaba_number", data.shaba_number);
  formData.append("is_main", data.is_main + "");
  formData.append("bank_name", data.bank_name);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["add-wallet-card"], formData, { headers });
};

export const getWithdrawals = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["withdrawal"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const createWithdrawal = (token: string, data: Withdrawal) => {
  const formData = new FormData();

  formData.append("wallet_card", data.wallet_card);
  formData.append("amount", data.amount + "");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(api["withdrawal"], formData, { headers });
};
