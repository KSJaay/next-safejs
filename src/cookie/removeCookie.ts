import {IncomingMessage, ServerResponse} from "http";
import setCookie from "./setCookie";
import {CookieAttributes} from "../typings/cookie";

function removeCookie(
  key: string,
  options: CookieAttributes,
  request: IncomingMessage | undefined,
  response: ServerResponse | undefined
) {
  setCookie(key, "", {...options, maxAge: -1}, request, response);
}

export default removeCookie;
