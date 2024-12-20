import { getReports, updateAvatar, updatePersonlInfo } from "./apis";
import { CommonUser, Reservation } from "../../lib/common";
import { useUserSetState, useUserState } from "../../providers/UserProvider";
import { useState } from "react";

const useUpdatePersonalInfo = () => {
  const fetch = async ({
    user_url,
    params,
    setUser,
    customFunction,
    onError,
  }: {
    user_url: string;
    params: CommonUser;
    setUser: (value: CommonUser) => void;
    customFunction?: (data: CommonUser) => void;
    onError?: (error: any, data: CommonUser) => void;
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
  const user = useUserState();

  const fetch = async ({
    setReports,
    customFunction,
    onError,
  }: {
    setReports: (value: Reservation[]) => void;
    customFunction?: (data: Reservation[]) => void;
    onError?: (error: any) => void;
  }) => {
    getReports(user.username)
      .then((res: any) => {
        setReports(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
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
    customFunction?: (data: CommonUser) => void;
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

export { useUpdatePersonalInfo, useGetReports, useUpdateAvatar };
