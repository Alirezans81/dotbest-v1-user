import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const deleteItem = (url: string) => {
  return axios.delete(url);
};

export { deleteItem };
