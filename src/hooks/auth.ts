import { useRefreshAccessToken } from "../api/auth/hooks";
import { User, defaultUser } from "../lib/common";
import { useLoggedInSetState } from "../providers/LoggedInProvider";
import {
  TokenType,
  useTokenSetState,
  useTokenState,
} from "../providers/TokenProvider";
import { useUserSetState } from "../providers/UserProvider";
import { useOpenToast } from "./popups";

//----------------------------------- Token
const saveToken = (token: TokenType) => {
  window.localStorage.setItem("token", JSON.stringify(token));
};
const customSetToken = (
  _token: TokenType,
  _setToken: (value: TokenType) => void
) => {
  saveToken(_token);
  _setToken(_token);
};
export const useCustomSetToken = () => {
  const setToken = useTokenSetState();
  return (token: TokenType) => customSetToken(token, setToken);
};

const removeToken = () => {
  window.localStorage.removeItem("token");
};
export const useRemoveToken = () => {
  return removeToken;
};

const checkLoggedIn = () => {
  const token = window.localStorage.getItem("token");

  if (token) {
    const parsedToken: TokenType = JSON.parse(token);
    return parsedToken;
  }
  return null;
};
export const useCheckLoggedIn = () => {
  return () => checkLoggedIn();
};

const logout = (
  setLoggedIn: (value: boolean) => void,
  setToken: (value: TokenType) => void,
  setUser: (value: User) => void
) => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("token");

  setLoggedIn(false);
  setToken({
    access: "",
    exp_access: 0,
    refresh: "",
    exp_refresh: 0,
  });
  setUser(defaultUser);
};
export const useLogout = () => {
  const setLoggedIn = useLoggedInSetState();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();
  return () => logout(setLoggedIn, setToken, setUser);
};

const checkTokenExpired = (
  token: TokenType | null,
  logout: () => void,
  refreshAccessToken: ({
    received_token,
    customFunction,
    onError,
    onFinally,
  }: {
    received_token?: TokenType;
    customFunction?: (data: any) => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
  }) => void,
  openToast: (message: string) => void,
  givenCustomFunction?: (token: TokenType) => void
) => {
  const current = Math.floor(Date.now() / 1000);

  if (token) {
    if (token.exp_refresh - current <= 0) {
      logout();
      return true;
    } else {
      if (token.exp_access - current <= 0) {
        refreshAccessToken({
          received_token: token,
          customFunction(data) {
            let temp = token;
            temp.access = data.access;
            temp.exp_access = data.exp_access;
            givenCustomFunction && givenCustomFunction(temp);
          },
          onError(error) {
            openToast(error.message);
          },
        });
        return true;
      }
      return false;
    }
  }
  return true;
};
export const useCheckTokenExpired = () => {
  const token = useTokenState();
  const logout = useLogout();
  const refreshAccessToken = useRefreshAccessToken();
  const openToast = useOpenToast();

  return (_token?: TokenType, customFunction?: (token: TokenType) => void) =>
    checkTokenExpired(
      _token || token,
      logout,
      refreshAccessToken,
      openToast,
      customFunction
    );
};
//-----------------------------------

//----------------------------------- User
const saveUser = (user: User) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};
const customSetUser = (_user: User, _setUser: (value: User) => void) => {
  saveUser(_user);
  _setUser(_user);
};
export const useCustomSetUser = () => {
  const setUser = useUserSetState();
  return (_user: User) => customSetUser(_user, setUser);
};
//-----------------------------------
