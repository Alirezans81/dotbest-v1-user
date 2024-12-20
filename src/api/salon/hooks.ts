import {
  getBestSalons,
  getSalonBarbers,
  getSalonData,
  getSalons,
} from "./apis";
import { Barber, Salon } from "../../lib/salon";

const useGetSalons = () => {
  const fetch = async ({
    setSalons,
    customFunction,
    onError,
  }: {
    setSalons: (value: Salon[]) => void;
    customFunction?: (data: Salon[]) => void;
    onError?: (error: any) => void;
  }) => {
    getSalons()
      .then((res: any) => {
        setSalons(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

const useGetBestSalons = () => {
  const fetch = async ({
    setBestSalons,
    customFunction,
    onError,
  }: {
    setBestSalons: (value: Salon[]) => void;
    customFunction?: (data: Salon[]) => void;
    onError?: (error: any) => void;
  }) => {
    await getBestSalons()
      .then((res: any) => {
        setBestSalons(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

const useGetSalonData = () => {
  const fetch = async ({
    salon_slug,
    setSalon,
    customFunction,
    onError,
  }: {
    salon_slug: string;
    setSalon: (value: Salon) => void;
    customFunction?: (data: Salon) => void;
    onError?: (error: any) => void;
  }) => {
    await getSalonData(salon_slug)
      .then((res: any) => {
        setSalon(res.data);
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

const useGetSalonBarbers = () => {
  const fetch = async ({
    salon_slug,
    setBarbers,
    customFunction,
    onError,
  }: {
    salon_slug: string;
    setBarbers: (value: Barber[]) => void;
    customFunction?: (data: Barber[]) => void;
    onError?: (error: any) => void;
  }) => {
    await getSalonBarbers(salon_slug)
      .then((res: any) => {
        setBarbers(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

export { useGetSalons, useGetBestSalons, useGetSalonData, useGetSalonBarbers };
