import {RemoveCookie} from "../typings/cookie";
import setCookie from "./setCookie";

function removeCookie({key, request, response}: RemoveCookie) {
  setCookie({
    key,
    data: "",
    options: {maxAge: -1},
    request,
    response,
  });
}

export default removeCookie;
