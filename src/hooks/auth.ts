import { Dispatch, useState } from "react";
import { useGetUserData } from "../api/auth/hooks";
import { CommonUser, defaultUser } from "../lib/common";
import { useLoggedInSetState } from "../providers/LoggedInProvider";
import { useUserSetState } from "../providers/UserProvider";
import { useOpenToast } from "./popups";

//----------------------------------- Token
const saveToken = (token: string) => {
  window.localStorage.setItem("token", token);
};
const useSaveToken = () => {
  return saveToken;
};

const getSavedToken = () => {
  window.localStorage.getItem("token");
};
const useGetSavedToken = () => {
  return getSavedToken;
};

const removeToken = () => {
  window.localStorage.removeItem("token");
};
const useRemoveToken = () => {
  return removeToken;
};

const checkLoggedIn = (
  setLoggedIn: (value: boolean) => void,
  getUserData: ({
    user_url,
    setUser,
    customFunction,
    onError,
  }: {
    user_url: string;
    setUser: (data: CommonUser) => void;
    customFunction?: (data: any) => void;
    onError?: (error: any, data: string) => void;
  }) => void,
  setUser: (value: CommonUser) => void,
  setLoaded: Dispatch<React.SetStateAction<boolean>>,
  openToast: (message: string) => void
) => {
  const user = window.localStorage.getItem("user");

  if (user) {
    const parsedUser: CommonUser = JSON.parse(user);
    getUserData({
      user_url: parsedUser.url,
      setUser,
      customFunction() {
        setLoaded(true);
        setLoggedIn(true);
      },
      onError(error) {
        openToast(error.message);
      },
    });
    return true;
  }
  return false;
};
const useCheckLoggedIn = () => {
  const [loaded, setLoaded] = useState(false);
  const setLoggedIn = useLoggedInSetState();
  const getUserData = useGetUserData();
  const setUser = useUserSetState();
  const openToast = useOpenToast();

  return {
    checkLoggedIn: () =>
      checkLoggedIn(setLoggedIn, getUserData, setUser, setLoaded, openToast),
    loaded,
  };
};

const logout = (
  setLoggedIn: (value: boolean) => void,
  setUser: (value: CommonUser) => void
) => {
  window.localStorage.removeItem("user");

  setLoggedIn(false);
  setUser(defaultUser);
};
const useLogout = () => {
  const setLoggedIn = useLoggedInSetState();
  const setUser = useUserSetState();

  return () => logout(setLoggedIn, setUser);
};
//-----------------------------------

//----------------------------------- User
const saveUser = (user: CommonUser) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};
const customSetUser = (
  _user: CommonUser,
  _setUser: (value: CommonUser) => void
) => {
  saveUser(_user);
  _setUser(_user);
};
const useCustomSetUser = () => {
  const setUser = useUserSetState();
  return (_user: CommonUser) => customSetUser(_user, setUser);
};
//-----------------------------------

export {
  useCheckLoggedIn,
  useSaveToken,
  useGetSavedToken,
  useRemoveToken,
  useCustomSetUser,
  useLogout,
};
