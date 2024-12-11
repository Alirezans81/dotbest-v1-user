import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import { CommonUser } from "../../lib/common";
import queryString from "query-string";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const updatePersonlInfo = (user_url: string, params: CommonUser) => {
  const formData = new FormData();

  formData.append("first_name", params.first_name);
  formData.append("last_name", params.last_name);

  return axios.patch(user_url, formData);
};

const getCategories = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["category"],
    query: { is_active: true, is_deleted: false },
  });

  return axios.get(urlWithQueries);
};

export { updatePersonlInfo, getCategories };
