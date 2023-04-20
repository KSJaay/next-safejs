import {IncomingMessage, ServerResponse} from "http";
export interface CookieAttributes {
  path?: string;
  domain?: string;
  expires?: Date;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | true;
  secure?: boolean;
  [property: string]: any;
}

export interface GetCookie {
  key: string;
  request?: IncomingMessage;
}

export interface GetMultipleCookies {
  request?: IncomingMessage;
  keys: string[];
}

export interface SideCookieOptions {
  options?: CookieAttributes;
  hostname?: string;
}

export interface RemoveCookie {
  key: string;
  request?: IncomingMessage;
  response?: ServerResponse;
}

export interface Serialize {
  name: string;
  val: string;
  options?: CookieAttributes;
}

export interface SetCookie {
  key: string;
  data: any;
  options?: CookieAttributes;
  request?: IncomingMessage;
  response?: ServerResponse;
}
