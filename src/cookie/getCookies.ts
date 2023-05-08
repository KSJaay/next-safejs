import { IncomingMessage } from 'http';
import { isClientSide } from './utils';
import { parse } from 'cookie';

export function parseDocCookies(cookies: string, decode?: any) {
  const decodeString = decode || dec;
  const cookiesArray = cookies.split('; ') || [];

  const cookiesObject: {
    [key: string]: any;
  } = {};

  for (const cookie of cookiesArray) {
    const [key, v] = cookie.trim().split('=');
    try {
      if (!cookiesObject[key]) cookiesObject[key] = decodeString(v);
    } catch (e) {
      if (!cookiesObject[key]) cookiesObject[key] = v;
    }
  }

  return cookiesObject;
}

function dec(value: string) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value;
  }
}

function getCookies(request?: IncomingMessage) {
  if (isClientSide()) {
    if (!document.cookie) {
      return {};
    }

    return parseDocCookies(document.cookie);
  }

  if (!request?.headers?.cookie) {
    return {};
  }

  return parse(request.headers.cookie);
}

export default getCookies;
