import { SideCookieOptions } from '../typings/cookie';

const clientSideCookieOptions = ({ options, hostname }: SideCookieOptions) => {
  const baseURL = hostname || process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL) throw new Error('Provide a valid url');

  return {
    path: '/',
    domain: baseURL,
    httpOnly: false,
    sameSite: 'lax',
    ...options,
  };
};

const serverSideCookieOptions = ({ options, hostname }: SideCookieOptions) => {
  const baseURL = hostname || process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL) throw new Error('Provide a valid url');

  return {
    path: '/',
    domain: baseURL,
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  };
};

export default { clientSideCookieOptions, serverSideCookieOptions };
