import {IncomingMessage} from "http";
import getCookies from "./getCookies";

function getCookieKeys(request?: IncomingMessage) {
  const cookies = getCookies(request);

  return Object.keys(cookies);
}

export default getCookieKeys;
