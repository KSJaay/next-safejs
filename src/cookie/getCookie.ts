import { IncomingMessage } from 'http';
import getCookies from './getCookies';

function getCookie(key: string, request?: IncomingMessage) {
  const cookies = getCookies(request);

  return cookies[key];
}

export default getCookie;
