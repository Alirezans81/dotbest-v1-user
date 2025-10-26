import axios from "axios";

import dev from "../api-dev";
import prod from "../api-prod";
import queryString from "query-string";

const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

export const getBarbers = (token: string, filtersObject?: any) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["barber"],
    query: filtersObject
      ? { is_active: true, is_deleted: false, ...filtersObject }
      : { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getBestBarbers = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["best-barbers"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getSalons = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["salon"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getBestSalons = (token: string) => {
  const urlWithQueries = queryString.stringifyUrl({
    url: api["best-salons"],
    query: { is_active: true, is_deleted: false },
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(urlWithQueries, { headers });
};

export const getSalonData = (salon_slug: string) => {
  return axios.get(api["salon"] + salon_slug + "/");
};

export const getSalonBarbersByCategory = (
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

export const getBarberData = (token: string, barber_slug: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(api["barber"] + barber_slug + "/", { headers });
};

export const getSalonComments = (salon_slug: string, filters: any) => {
  if (filters) {
    let query = filters;
    query.is_active = true;
    query.is_deleted = false;
    query.salon = salon_slug;

    const urlWithQueries = queryString.stringifyUrl({
      url: api["comment"],
      query,
    });

    return axios.get(urlWithQueries);
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["comment"],
      query: {
        is_active: true,
        is_deleted: false,
        salon: salon_slug,
      },
    });

    return axios.get(urlWithQueries);
  }
};

export const getBarberComments = (
  token: string,
  barber_slug: string,
  filters: any
) => {
  if (filters) {
    let query = filters;
    query.is_active = true;
    query.is_deleted = false;
    query.barber = barber_slug;

    const urlWithQueries = queryString.stringifyUrl({
      url: api["comment"],
      query,
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  } else {
    const urlWithQueries = queryString.stringifyUrl({
      url: api["comment"],
      query: {
        is_active: true,
        is_deleted: false,
        barber: barber_slug,
      },
    });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(urlWithQueries, { headers });
  }
};
