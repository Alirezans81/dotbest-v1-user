import { useOpenToast } from "../../hooks/popups";
import {
  Category,
  defaultWallet,
  Ticket,
  TicketCategory,
  Wallet,
} from "../../lib/common";
import { useCategoriesSetState } from "../../providers/CategoriesProvider";
import { useTokenState } from "../../providers/TokenProvider";
import { useUserState } from "../../providers/UserProvider";
import {
  createTicket,
  deleteItem,
  getCategories,
  getTicketCatgories,
  getWallet,
} from "./apis";

export const useDeleteItem = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    url,
    customFunction,
    onError,
    onFinally,
  }: {
    url: string;
    customFunction?: (data: any) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    deleteItem(token.access, url)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
        openToast(error.message);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetCategories = () => {
  const token = useTokenState();
  const setCategories = useCategoriesSetState();
  const openToast = useOpenToast();

  const fetch = async ({
    received_access_token,
    customFunction,
    onError,
    onFinally,
  }: {
    received_access_token?: string;
    customFunction?: (data: Category[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    getCategories(received_access_token || token.access)
      .then((res: any) => {
        setCategories(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
        openToast(error.message);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetTicketCategories = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    setTicketCategories,
    customFunction,
    onError,
    onFinally,
  }: {
    setTicketCategories: (value: TicketCategory[]) => void;
    customFunction?: (data: TicketCategory[]) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    getTicketCatgories(token.access)
      .then((res: any) => {
        setTicketCategories(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
        openToast(error.message);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useCreateTicket = () => {
  const token = useTokenState();
  const user = useUserState();
  const openToast = useOpenToast();

  const fetch = async ({
    params,
    customFunction,
    onError,
    onFinally,
  }: {
    params: Ticket;
    customFunction?: (data: Ticket) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    createTicket(token.access, user.url, params)
      .then((res: any) => {
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
        openToast(error.message);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetWallet = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    received_access_token,
    setWallet,
    customFunction,
    onError,
    onFinally,
  }: {
    received_access_token?: string;
    setWallet: (value: Wallet) => void;
    customFunction?: (data: Wallet) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    getWallet(received_access_token || token.access)
      .then((res: any) => {
        setWallet(res.data.results[0] || defaultWallet);
        customFunction && customFunction(res.data.results[0] || defaultWallet);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
        openToast(error.message);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};
