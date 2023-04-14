import {IncomingMessage} from "http";
import getCookies from "./getCookies";

function getCookie(request: IncomingMessage | undefined, name: string) {
  const cookies = getCookies(request);

  return cookies[name];
}

export default getCookie;
