import {IncomingMessage} from "http";
import getCookies from "./getCookies";

function getCookieKeys(request: IncomingMessage | undefined) {
  const cookies = getCookies(request);

  return Object.keys(cookies);
}

export default getCookieKeys;
