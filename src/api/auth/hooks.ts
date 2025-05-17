import { useCustomSetToken, useCustomSetUser } from "../../hooks/auth";
import { useOpenToast } from "../../hooks/popups";
import { User, defaultUser } from "../../lib/common";
import { UserInitParams } from "../../lib/user";
import { TokenType, useTokenState } from "../../providers/TokenProvider";
import { getUserData, refreshAccessToken, sendCode, verifyCode } from "./apis";
import * as jalaali from "jalaali-js";

export const useSendCode = () => {
  const openToast = useOpenToast();

  const fetch = async ({
    phone,
    customFunction,
    onError,
    onFinally,
  }: {
    phone: string;
    customFunction?: (data: any) => void;
    onError?: (error: any, data: string) => void;
    onFinally?: () => void;
  }) => {
    await sendCode(phone)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, phone);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

const monthes = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const getMonthNumber = (value: string) => {
  return monthes.findIndex((e) => e === value) + 1;
};
export type VerifyCodeUserParams = {
  phone: string;
  name: string;
  melli_code: string;
  birthday: string;
  account_type: User["account_type"];
};
export const useVerifyCode = () => {
  const setToken = useCustomSetToken();
  const openToast = useOpenToast();

  const fetch = async ({
    phone,
    code,
    userParams,
    customFunction,
    onError,
    onFinally,
  }: {
    phone: string;
    code: string;
    userParams: UserInitParams | null;
    customFunction?: (token: TokenType) => void;
    onError?: (error: any, data: string) => void;
    onFinally?: () => void;
  }) => {
    let params: User = defaultUser;
    if (userParams) {
      const a = jalaali.toGregorian(
        parseInt(userParams.birthday_year, 10),
        getMonthNumber(userParams.birthday_month),
        parseInt(userParams.birthday_day, 10)
      );
      const birthday = new Date(a.gy + "/" + a.gm + "/" + a.gd);

      params.first_name = userParams.first_name;
      params.last_name = userParams.last_name;
      params.national_code = userParams.melli_code;
      params.birth_date = birthday.toISOString();
      params.account_type = userParams.account_type;
    }

    await verifyCode(phone, code, params)
      .then((res: any) => {
        setToken(res.data);
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        openToast(error.message);
        onError && onError(error, code);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };

  return fetch;
};

export const useRefreshAccessToken = () => {
  const token = useTokenState();
  const setToken = useCustomSetToken();
  const openToast = useOpenToast();

  const fetch = async ({
    received_token,
    customFunction,
    onError,
    onFinally,
  }: {
    received_token?: TokenType;
    customFunction?: (data: any) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    await refreshAccessToken(received_token?.refresh || token.refresh)
      .then((res: any) => {
        if (received_token) {
          let temp = received_token;
          temp.access = res.data.access;
          temp.exp_access = res.data.exp_access;
          setToken(temp);
        } else {
          let temp = token;
          temp.access = res.data.access;
          temp.exp_access = res.data.exp_access;
          setToken(temp);
        }
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

export const useGetUserData = () => {
  const token = useTokenState();
  const setUser = useCustomSetUser();
  const openToast = useOpenToast();

  const fetch = async ({
    received_access_token,
    customFunction,
    onError,
    onFinally,
  }: {
    received_access_token?: string;
    customFunction?: (data: any) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => {
    await getUserData(received_access_token || token.access)
      .then((res: any) => {
        setUser(res.data);
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
