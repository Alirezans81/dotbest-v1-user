import { CommonUser, defaultUser } from "../lib/common";
import { useLoggedInSetState } from "../providers/LoggedInProvider";
import { useUserSetState } from "../providers/UserProvider";

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
  setUser: (value: CommonUser) => void
) => {
  const user = window.localStorage.getItem("user");

  if (user) {
    setLoggedIn(true);
    setUser(JSON.parse(user));
    return true;
  }
  return false;
};
const useCheckLoggedIn = () => {
  const setLoggedIn = useLoggedInSetState();
  const setUser = useUserSetState();

  return () => checkLoggedIn(setLoggedIn, setUser);
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
