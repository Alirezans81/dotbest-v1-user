import axios from "axios";
import queryString from "query-string";

import dev from "../api-dev";
import prod from "../api-prod";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

export const getBarberCategoryGallery = (
  token: string,
  barber_slug: string,
  filtersObject?: any
) => {
  let urlWithQueries;

  if (filtersObject) {
    urlWithQueries = queryString.stringifyUrl({
      url: api["barber-category-gallery"],
      query: {
        is_active: true,
        is_deleted: false,
        barber: barber_slug,
        ...filtersObject,
      },
    });
  } else {
    urlWithQueries = queryString.stringifyUrl({
      url: api["barber-category-gallery"],
      query: {
        is_active: true,
        is_deleted: false,
        barber: barber_slug,
      },
    });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getBarberServices = (token: string, barber_slug: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["barber-service"],
    query: {
      barber: barber_slug,
      is_active: true,
      is_deleted: false,
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getBarberServicesByCategory = (
  token: string,
  barber_slug: string,
  service_category: string
) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["barber-service"],
    query: {
      is_active: true,
      is_deleted: false,
      barber: barber_slug,
      category: service_category,
    },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};
