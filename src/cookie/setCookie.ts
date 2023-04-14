import {IncomingMessage, ServerResponse} from "http";
import getCookies from "./getCookies";
import {isClientSide} from "./utils";
import {CookieAttributes} from "../typings/cookie";
import serialize from "./serialize";

function stringify(data: any) {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return data;
  }
}

function setCookie(
  name: string,
  data: any,
  options: CookieAttributes,
  request: IncomingMessage | undefined,
  response: ServerResponse | undefined
) {
  const serializedCookie = serialize(name, stringify(data), options);

  if (isClientSide()) {
    document.cookie = serializedCookie;
    return;
  }

  if (!request) throw new Error("request is undefined");
  if (!response) throw new Error("response is undefined");

  const cookies = getCookies(request);
  if (!data) {
    delete cookies[name];
  } else {
    cookies[name] = serializedCookie;
  }

  const cookiesAsSrting = Object.entries(cookies).reduce((accum, item) => {
    return accum.concat(`${item[0]}=${item[1]};`);
  }, "");

  response.setHeader("Set-Cookie", [cookiesAsSrting]);
  request.headers.cookie = cookiesAsSrting;
}

export default setCookie;
