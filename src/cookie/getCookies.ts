import {IncomingMessage} from "http";
import {isClientSide} from "./utils";

export function parseCookies(cookies: string) {
  const cookiesArray = cookies.split("; ") || [];

  const cookiesObject: {
    [key: string]: any;
  } = {};

  for (const cookie of cookiesArray) {
    const [key, v] = cookie.trim().split("=");
    try {
      cookiesObject[key] = decodeURIComponent(v);
    } catch (e) {
      cookiesObject[key] = v;
    }
  }

  return cookiesObject;
}

function getCookies(request?: IncomingMessage) {
  if (isClientSide()) {
    if (!document.cookie) {
      return {};
    }

    return parseCookies(document.cookie);
  }

  if (!request?.headers?.cookie) {
    return {};
  }

  return parseCookies(request.headers.cookie);
}

export default getCookies;
