import Cookies from "js-cookie";

const KEY = "userToken";

export const setCookieToken = (token: string) => {
  Cookies.set(KEY, token);
};

export const getCookieToken = () => {
  return Cookies.get(KEY);
};

export const removeCookieToken = () => {
  Cookies.remove(KEY);
};
