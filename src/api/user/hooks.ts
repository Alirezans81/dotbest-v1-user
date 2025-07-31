import {
  changeOrderStatus,
  createOrder,
  createOrderComment,
  getBarberSerivce,
  getOrderUserComments,
  getReports,
  likeComment,
  updateAvatar,
  updatePersonlInfo,
} from "./apis";
import { User, Order, OrderComment } from "../../lib/common";
import { useUserSetState, useUserState } from "../../providers/UserProvider";
import { useState } from "react";
import { Comment } from "../../lib/salon";
import { useTokenState } from "../../providers/TokenProvider";
import { useOpenToast } from "../../hooks/popups";
import { BarberService } from "../../lib/barber";

export const useUpdatePersonalInfo = () => {
  const fetch = async ({
    user_url,
    params,
    setUser,
    customFunction,
    onError,
  }: {
    user_url: string;
    params: User;
    setUser: (value: User) => void;
    customFunction?: (data: User) => void;
    onError?: (error: any, data: User) => void;
  }) => {
    await updatePersonlInfo(user_url, params)
      .then((res: any) => {
        setUser && setUser(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, params);
      });
  };

  return fetch;
};

export const useGetReports = () => {
  const token = useTokenState();
  const user = useUserState();
  const openToast = useOpenToast();

  const fetch = async ({
    setReports,
    customFunction,
    onError,
    onFinnally,
  }: {
    setReports: (value: Order[]) => void;
    customFunction?: (data: Order[]) => void;
    onError?: (error: any) => void;
    onFinnally?: () => void;
  }) => {
    getReports(token.access, user.username)
      .then((res: any) => {
        setReports(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error);
      })
      .finally(() => {
        onFinnally && onFinnally();
      });
  };

  return fetch;
};

export const useUpdateAvatar = () => {
  const user = useUserState();
  const setUser = useUserSetState();

  const [loading, setLoading] = useState(false);
  const fetch = async ({
    file,
    customFunction,
    onError,
  }: {
    file: File;
    customFunction?: (data: User) => void;
    onError?: (error: any, data: File) => void;
  }) => {
    setLoading(true);
    await updateAvatar(user.url, file)
      .then((res: any) => {
        setUser && setUser(res.data.results);
        customFunction && customFunction(res.data.results);
        setLoading(false);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, file);
        setLoading(false);
      });
  };

  return { updateAvatar: fetch, loading };
};

export const useLikeComment = () => {
  const fetch = async ({
    comment_url,
    like_count,
    customFunction,
    onError,
  }: {
    comment_url: string;
    like_count: number;
    customFunction?: (data: Comment) => void;
    onError?: (error: any, comment_url: string, like_count: number) => void;
  }) => {
    await likeComment(comment_url, like_count)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, comment_url, like_count);
      });
  };

  return fetch;
};

export const useDisikeComment = () => {
  const fetch = async ({
    comment_url,
    dislike_count,
    customFunction,
    onError,
  }: {
    comment_url: string;
    dislike_count: number;
    customFunction?: (data: Comment) => void;
    onError?: (error: any, comment_url: string, dislike_count: number) => void;
  }) => {
    await likeComment(comment_url, dislike_count)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, comment_url, dislike_count);
      });
  };

  return fetch;
};

export const useCreateOrder = () => {
  const openToast = useOpenToast();
  const token = useTokenState();

  const fetch = async ({
    data,
    customFunction,
    onError,
    onFinally,
  }: {
    data: Order;
    customFunction?: (data: Comment) => void;
    onError?: (error: any, data: Order) => void;
    onFinally?: () => void;
  }) => {
    await createOrder(token.access, data)
      .then((res: any) => {
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, data);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useChangeOrderStatus = () => {
  const token = useTokenState();
  const openToast = useOpenToast();

  const fetch = async ({
    order_slug,
    status,
    customFunction,
    onError,
    onFinally,
  }: {
    order_slug: string;
    status: Order["status"];
    customFunction?: (data: Order) => void;
    onError?: (error: any, order_slug: string) => void;
    onFinally?: () => void;
  }) => {
    await changeOrderStatus(token.access, order_slug, status)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, order_slug);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetBarberService = () => {
  const openToast = useOpenToast();
  const token = useTokenState();

  const fetch = async ({
    service_url,
    customFunction,
    setBarberService,
    onError,
    onFinally,
  }: {
    service_url: string;
    setBarberService: (value: BarberService) => void;
    customFunction?: (data: BarberService) => void;
    onError?: (error: any, service_url: string) => void;
    onFinally?: () => void;
  }) => {
    await getBarberSerivce(token.access, service_url)
      .then((res: any) => {
        setBarberService(res.data);
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, service_url);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useGetOrderUserComments = () => {
  const openToast = useOpenToast();
  const token = useTokenState();
  const user = useUserState();

  const fetch = async ({
    order_slug,
    customFunction,
    setOrderUserComments,
    onError,
    onFinally,
  }: {
    order_slug: string;
    setOrderUserComments: (value: Comment[]) => void;
    customFunction?: (data: Comment[]) => void;
    onError?: (error: any, order_slug: string, username: string) => void;
    onFinally?: () => void;
  }) => {
    await getOrderUserComments(token.access, order_slug, user.username)
      .then((res: any) => {
        setOrderUserComments(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, order_slug, user.username);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useCreateOrderComment = () => {
  const openToast = useOpenToast();
  const token = useTokenState();
  const user = useUserState();

  const fetch = async ({
    data,
    customFunction,
    onError,
    onFinally,
  }: {
    data: OrderComment;
    customFunction?: (data: OrderComment[]) => void;
    onError?: (error: any, data: OrderComment) => void;
    onFinally?: () => void;
  }) => {
    await createOrderComment(token.access, { ...data, user: user.url })
      .then((res: any) => {
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, data);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};
