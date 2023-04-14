import {CookieAttributes} from "../typings/cookie";

const clientSideCookieOptions = (
  options: CookieAttributes | undefined = {},
  hostname?: string | undefined
) => {
  const baseURL = hostname || process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL) throw new Error("Provide a valid url");

  return {
    path: "/",
    domain: baseURL,
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...options,
  };
};

const serverSideCookieOptions = (
  options: CookieAttributes | undefined = {},
  hostname?: string | undefined
) => {
  const baseURL = hostname || process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL) throw new Error("Provide a valid url");

  return {
    path: "/",
    domain: baseURL,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...options,
  };
};

export default {clientSideCookieOptions, serverSideCookieOptions};
