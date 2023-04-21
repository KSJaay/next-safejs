import { GetCookie } from '../typings/cookie';
import getCookies from './getCookies';

function getCookie({ request, key }: GetCookie) {
  const cookies = getCookies(request);

  return cookies[key];
}

export default getCookie;
