import getCookies from "./getCookies";
import {isClientSide} from "./utils";
import {SetCookie} from "../typings/cookie";
import serialize from "./serialize";

const stringfy = (data: any) => {
  if (typeof data === "object") {
    return JSON.stringify(data);
  }

  return data;
};

function setCookie({key, data, options, request, response}: SetCookie) {
  const serializedCookie = serialize({
    name: key,
    val: data,
    options,
  });

  if (isClientSide()) {
    document.cookie = serializedCookie;
    return;
  }

  if (!request) throw new Error("request is undefined");
  if (!response) throw new Error("response is undefined");

  let currentCookies = response.getHeader("Set-Cookie");

  if (!Array.isArray(currentCookies)) {
    currentCookies = !currentCookies ? [] : [String(currentCookies)];
  }
  response.setHeader("Set-Cookie", currentCookies.concat(serializedCookie));

  const cookies = getCookies(request);
  !data ? delete cookies[key] : (cookies[key] = stringfy(data));

  const cookiesAsSrting = Object.entries(cookies).reduce((accum, item) => {
    return item[0] ? accum.concat(`${item[0]}=${item[1]};`) : accum;
  }, "");

  response.setHeader("Set-Cookie", [cookiesAsSrting]);
  request.headers.cookie = cookiesAsSrting;
}

export default setCookie;
