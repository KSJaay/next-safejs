import {GetMultipleCookies} from "../typings/cookie";
import getCookies from "./getCookies";

function getMultipleCookies({request, keys}: GetMultipleCookies) {
  const cookies = getCookies(request);

  return keys.reduce((acc: any, name: string) => {
    acc[name] = cookies[name];
    return acc;
  }, {});
}

export default getMultipleCookies;
