import {IncomingMessage} from "http";
import getCookies from "./getCookies";

function getMultipleCookies(
  request: IncomingMessage | undefined,
  names: string[]
) {
  const cookies = getCookies(request);

  return names.reduce((acc: any, name: string) => {
    acc[name] = cookies[name];
    return acc;
  }, {});
}

export default getMultipleCookies;
