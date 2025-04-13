import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import { User } from "../../lib/common";
import queryString from "query-string";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const updatePersonlInfo = (user_url: string, params: User) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);

  return axios.patch(user_url, formData);
};

const getReports = (token: string, username: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["order"],
    query: { is_deleted: false, user: username },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

const updateAvatar = (user_url: string, file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  return axios.patch(user_url, formData);
};

const likeComment = (comment_url: string, like_count: number) => {
  const formData = new FormData();

  formData.append("like", like_count + "");

  return axios.patch(comment_url, formData);
};

const dislikeComment = (comment_url: string, dislike_count: number) => {
  const formData = new FormData();

  formData.append("dislike", dislike_count + "");

  return axios.patch(comment_url, formData);
};

export {
  updatePersonlInfo,
  getReports,
  updateAvatar,
  likeComment,
  dislikeComment,
};
