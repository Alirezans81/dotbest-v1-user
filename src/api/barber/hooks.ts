import {
  getBarberCategoryGallery,
  getBarberServices,
  getBarberServicesByCategory,
} from "./apis";
import { useTokenState } from "../../providers/TokenProvider";
import { useOpenToast } from "../../hooks/popups";
import { BarberCategoryGallery, BarberService } from "../../lib/barber";

export const useGetBarberCategoryGallery = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    barber_slug,
    setGallery,
    filtersObject,
    customFunction,
    onError,
    onFinally,
  }: {
    barber_slug: string;
    setGallery: (value: BarberCategoryGallery[]) => void;
    filtersObject?: any;
    customFunction?: (data: BarberCategoryGallery[]) => void;
    onError?: (error: any, barber_slug: string) => void;
    onFinally?: () => void;
  }) => {
    await getBarberCategoryGallery(token.access, barber_slug, filtersObject)
      .then((res: any) => {
        setGallery(res.data.results);
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

export const useGetBarberServices = () => {
  const token = useTokenState();

  const fetch = async ({
    received_access_token,
    barber_slug,
    setBarberServices,
    customFunction,
    onError,
    onFinally,
  }: {
    received_access_token?: string;
    barber_slug: string;
    setBarberServices: (data: BarberService[]) => void;
    customFunction?: (data: BarberService[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    await getBarberServices(received_access_token || token.access, barber_slug)
      .then((res: any) => {
        setBarberServices(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetBarberServiceByCategory = () => {
  const openToast = useOpenToast();
  const token = useTokenState();

  const fetch = async ({
    barber_slug,
    service_category,
    setBarberService,
    customFunction,
    onError,
    onFinally,
  }: {
    barber_slug: string;
    service_category: string;
    setBarberService: (value: BarberService | null) => void;
    customFunction?: (data: Comment) => void;
    onError?: (
      error: any,
      barber_slug: string,
      service_category: string
    ) => void;
    onFinally?: () => void;
  }) => {
    await getBarberServicesByCategory(
      token.access,
      barber_slug,
      service_category
    )
      .then((res: any) => {
        customFunction && customFunction(res.data?.results[0] || null);
        setBarberService(res.data?.results[0] || null);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, barber_slug, service_category);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};
