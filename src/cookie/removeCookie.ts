import { RemoveCookie } from '../typings/cookie';
import setCookie from './setCookie';

function removeCookie({ key, request, response }: RemoveCookie) {
  setCookie({
    key,
    options: { maxAge: -1 },
    request,
    response,
  });
}

export default removeCookie;
