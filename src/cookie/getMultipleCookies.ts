import { IncomingMessage } from 'http';
import getCookies from './getCookies';

function getMultipleCookies(keys: string[], request?: IncomingMessage) {
  const cookies = getCookies(request);

  return keys.reduce((acc: any, name: string) => {
    acc[name] = cookies[name];
    return acc;
  }, {});
}

export default getMultipleCookies;
