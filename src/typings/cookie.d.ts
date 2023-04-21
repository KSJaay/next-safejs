import { IncomingMessage, ServerResponse } from 'http';
export interface CookieAttributes {
  path?: string | undefined;
  domain?: string | undefined;
  expires?: Date | undefined;
  sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean | undefined;
  maxAge?: number | undefined;
  httpOnly?: boolean | undefined;
  [property: string]: any | undefined;
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
  data?: any;
  options?: CookieAttributes;
  request?: IncomingMessage;
  response?: ServerResponse;
}
