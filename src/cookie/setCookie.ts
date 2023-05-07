import getCookies from './getCookies';
import { isClientSide } from './utils';
import { CookieAttributes } from '../typings/cookie';
import { serialize } from 'cookie';
import { IncomingMessage, ServerResponse } from 'http';

const stringfy = (data: any) => {
  try {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }
    return data || '';
  } catch (e) {
    return data || '';
  }
};

function setCookie(
  key: string,
  data: any = '',
  options: CookieAttributes = {},
  request?: IncomingMessage,
  response?: ServerResponse,
) {
  if (!key) throw new Error('key is undefined');

  const serializedCookie = serialize(key, stringfy(data), { path: '/', ...options });

  if (isClientSide()) {
    document.cookie = serializedCookie;
    return;
  }

  if (!request) throw new Error('request is undefined');
  if (!response) throw new Error('response is undefined');

  let currentCookies = response.getHeader('Set-Cookie');

  if (!Array.isArray(currentCookies)) {
    currentCookies = !currentCookies ? [] : [String(currentCookies)];
  }

  response.setHeader('Set-Cookie', currentCookies.concat(serializedCookie));

  if (request?.headers?.cookie) {
    const cookies = getCookies(request);
    !data ? delete cookies[key] : (cookies[key] = stringfy(data));

    const cookiesAsSrting = Object.entries(cookies).reduce((accum, item) => {
      return item[0] ? accum.concat(`${item[0]}=${item[1]};`) : accum;
    }, '');

    request.headers.cookie = cookiesAsSrting;
  }
}

export default setCookie;
