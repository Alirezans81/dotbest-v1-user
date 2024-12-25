import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import queryString from "query-string";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

const getSalons = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["salon"],
    query: { is_active: true, is_deleted: false },
  });

  return axios.get(urlWithQueries);
};

const getBestSalons = () => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["best-salons"],
    query: { is_active: true, is_deleted: false },
  });

  return axios.get(urlWithQueries);
};

const getSalonData = (salon_slug: string) => {
  return axios.get(api["salon"] + salon_slug + "/");
};

const getSalonBarbersByCategory = (
  salon_slug: string,
  category_slug: string
) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["barber"],
    query: {
      is_active: true,
      is_deleted: false,
      salon: salon_slug,
      skill_category: category_slug,
    },
  });

  return axios.get(urlWithQueries);
};

const getBarberData = (barber_slug: string) => {
  return axios.get(api["barber"] + barber_slug + "/");
};

const getBarberGallery = (barber_slug: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["barber-gallery"],
    query: {
      is_active: true,
      is_deleted: false,
      barber: barber_slug,
    },
  });

  return axios.get(urlWithQueries, {
    headers: { "Content-Type": "application/json" },
  });
};

export {
  getSalons,
  getBestSalons,
  getSalonData,
  getSalonBarbersByCategory,
  getBarberData,
  getBarberGallery,
};
