import { getCategories, updatePersonlInfo } from "./apis";
import { Category, CommonUser } from "../../lib/common";

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
    updatePersonlInfo(user_url, params)
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

const useGetCategories = () => {
  const fetch = async ({
    setCategories,
    customFunction,
    onError,
  }: {
    setCategories: (value: Category[]) => void;
    customFunction?: (data: Category[]) => void;
    onError?: (error: any) => void;
  }) => {
    getCategories()
      .then((res: any) => {
        setCategories(res.data.results);
        customFunction && customFunction(res.data.results);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

export { useUpdatePersonalInfo, useGetCategories };
