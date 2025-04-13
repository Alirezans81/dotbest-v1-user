import {
  getReports,
  likeComment,
  updateAvatar,
  updatePersonlInfo,
} from "./apis";
import { User, Order } from "../../lib/common";
import { useUserSetState, useUserState } from "../../providers/UserProvider";
import { useState } from "react";
import { Comment } from "../../lib/salon";
import { useTokenState } from "../../providers/TokenProvider";
import { useOpenToast } from "../../hooks/popups";

const useUpdatePersonalInfo = () => {
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

const useGetReports = () => {
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

const useUpdateAvatar = () => {
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

const useLikeComment = () => {
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

const useDisikeComment = () => {
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

export {
  useUpdatePersonalInfo,
  useGetReports,
  useUpdateAvatar,
  useLikeComment,
  useDisikeComment,
};
