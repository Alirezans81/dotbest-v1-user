import {
  getBarberComments,
  getBarberData,
  getBarbers,
  getBestBarbers,
  getBestSalons,
  getSalonBarbersByCategory,
  getSalonComments,
  getSalonData,
  getSalons,
} from "./apis";
import { Comment, Salon } from "../../lib/salon";
import { useTokenState } from "../../providers/TokenProvider";
import { useOpenToast } from "../../hooks/popups";
import { Barber } from "../../lib/barber";

export const useGetBarbers = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    filtersObject,
    setBarbers,
    customFunction,
    onError,
    onFinally,
  }: {
    filtersObject?: any;
    setBarbers: (value: Barber[]) => void;
    customFunction?: (data: Barber[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    getBarbers(token.access, filtersObject)
      .then((res: any) => {
        setBarbers(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetBestBarbers = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    setBestBarbers,
    customFunction,
    onError,
    onFinally,
  }: {
    setBestBarbers: (value: Barber[]) => void;
    customFunction?: (data: Barber[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    await getBestBarbers(token.access)
      .then((res: any) => {
        setBestBarbers(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetSalons = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    setSalons,
    customFunction,
    onError,
    onFinally,
  }: {
    setSalons: (value: Salon[]) => void;
    customFunction?: (data: Salon[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    getSalons(token.access)
      .then((res: any) => {
        setSalons(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetBestSalons = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    setBestSalons,
    customFunction,
    onError,
    onFinally,
  }: {
    setBestSalons: (value: Salon[]) => void;
    customFunction?: (data: Salon[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    await getBestSalons(token.access)
      .then((res: any) => {
        setBestSalons(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetSalonData = () => {
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

export const useGetSalonBarbersByCategory = () => {
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

export const useGetBarberData = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    barber_slug,
    setBarber,
    customFunction,
    onError,
    onFinally,
  }: {
    barber_slug: string;
    setBarber: (value: Barber) => void;
    customFunction?: (data: Barber) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    await getBarberData(token.access, barber_slug)
      .then((res: any) => {
        setBarber(res.data);
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetSalonComments = () => {
  const fetch = async ({
    salon_slug,
    filters,
    setComments,
    customFunction,
    onError,
  }: {
    salon_slug: string;
    filters?: any;
    setComments: (value: Comment[]) => void;
    customFunction?: (data: Comment[]) => void;
    onError?: (error: any, salon_slug: string) => void;
  }) => {
    await getSalonComments(salon_slug, filters)
      .then((res: any) => {
        setComments(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, salon_slug);
      });
  };

  return fetch;
};

export const useGetBarberComments = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    barber_slug,
    filters,
    setComments,
    customFunction,
    onError,
    onFinally,
  }: {
    barber_slug: string;
    filters?: any;
    setComments: (value: Comment[]) => void;
    customFunction?: (data: Comment[]) => void;
    onError?: (error: any, barber_slug: string) => void;
    onFinally?: () => void;
  }) => {
    await getBarberComments(token.access, barber_slug, filters)
      .then((res: any) => {
        setComments(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, barber_slug);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};
