import { CommonUser } from "../../lib/common";
import { CreateParams } from "../../lib/interfaces";
import { Salon } from "../../lib/salon";
import { create, sendCode, verifyCode } from "./apis";

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
    sendCode(phone)
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
    verifyCode(code)
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
    create(params)
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

export { useSendCode, useVerifyCode, useCreate };
