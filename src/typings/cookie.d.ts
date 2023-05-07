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
