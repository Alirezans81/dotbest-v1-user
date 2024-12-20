import { CommonUser } from "../../lib/common";
import { CreateParams } from "../../lib/interfaces";
import { Salon } from "../../lib/salon";
import { create, getUserData, sendCode, verifyCode } from "./apis";

const useSendCode = () => {
  const fetch = async ({
    phone,
    customFunction,
    onError,
  }: {
    phone: string;
    customFunction?: (data: any) => void;
    onError?: (error: any, data: string) => void;
  }) => {
    await sendCode(phone)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, phone);
      });
  };

  return fetch;
};

const useVerifyCode = () => {
  const fetch = async ({
    code,
    setUser,
    customFunction,
    onError,
  }: {
    code: string;
    setUser: (data: CommonUser) => void;
    customFunction?: ({ user }: { user: CommonUser }) => void;
    onError?: (error: any, data: string) => void;
  }) => {
    await verifyCode(code)
      .then((res: any) => {
        setUser(res.data.results.user);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, code);
      });
  };

  return fetch;
};

const useCreate = () => {
  const fetch = async ({
    params,
    setUser,
    setSalon,
    customFunction,
    onError,
  }: {
    params: CreateParams;
    setUser: (data: CommonUser) => void;
    setSalon: (data: Salon) => void;
    customFunction?: (data: any) => void;
    onError?: (error: any, data: CreateParams) => void;
  }) => {
    await create(params)
      .then((res: any) => {
        setUser(res.data.results.user);
        setSalon(res.data.results.salon);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, params);
      });
  };

  return fetch;
};

const useGetUserData = () => {
  const fetch = async ({
    user_url,
    setUser,
    customFunction,
    onError,
  }: {
    user_url: string;
    setUser: (data: CommonUser) => void;
    customFunction?: (data: any) => void;
    onError?: (error: any, data: string) => void;
  }) => {
    await getUserData(user_url)
      .then((res: any) => {
        setUser(res.data);
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error, user_url);
      });
  };

  return fetch;
};

export { useSendCode, useVerifyCode, useCreate, useGetUserData };
