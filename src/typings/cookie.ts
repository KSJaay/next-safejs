export interface CookieAttributes {
  path?: string;
  domain?: string;
  expires?: Date;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | true;
  secure?: boolean;
  [property: string]: any;
}
