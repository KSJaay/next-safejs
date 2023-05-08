import { IncomingMessage, ServerResponse } from 'http';
import setCookie from './setCookie';

function removeCookie(key: string, request?: IncomingMessage, response?: ServerResponse) {
  setCookie(key, '', { maxAge: -1 }, request, response);
}

export default removeCookie;
