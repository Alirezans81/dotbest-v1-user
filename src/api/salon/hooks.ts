import {
  getBarberData,
  getBarberGallery,
  getBestSalons,
  getSalonBarbersByCategory,
  getSalonData,
  getSalons,
} from "./apis";
import { Barber, Photo, Salon } from "../../lib/salon";

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

const useGetSalonBarbersByCategory = () => {
  const fetch = async ({
    salon_slug,
    category_slug,
    setBarbers,
    customFunction,
    onError,
  }: {
    salon_slug: string;
    category_slug: string;
    setBarbers: (value: Barber[]) => void;
    customFunction?: (data: Barber[]) => void;
    onError?: (error: any) => void;
  }) => {
    await getSalonBarbersByCategory(salon_slug, category_slug)
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

const useGetBarberData = () => {
  const fetch = async ({
    barber_slug,
    setBarber,
    customFunction,
    onError,
  }: {
    barber_slug: string;
    setBarber: (value: Barber) => void;
    customFunction?: (data: Barber) => void;
    onError?: (error: any) => void;
  }) => {
    await getBarberData(barber_slug)
      .then((res: any) => {
        setBarber(res.data);
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

const useGetBarberGallery = () => {
  const fetch = async ({
    barber_slug,
    setGallery,
    customFunction,
    onError,
  }: {
    barber_slug: string;
    setGallery: (value: Photo[]) => void;
    customFunction?: (data: Photo[]) => void;
    onError?: (error: any, barber_slug: string) => void;
  }) => {
    await getBarberGallery(barber_slug)
      .then((res: any) => {
        setGallery(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, barber_slug);
      });
  };

  return fetch;
};

export {
  useGetSalons,
  useGetBestSalons,
  useGetSalonData,
  useGetSalonBarbersByCategory,
  useGetBarberData,
  useGetBarberGallery,
};
