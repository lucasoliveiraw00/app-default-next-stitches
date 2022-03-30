import {
  destroyCookie,
  parseCookies,
  setCookie as setNookiesCookie,
} from 'nookies';
import { CookieSerializeOptions } from 'cookie';

import { SESSION_TOKEN_REQUEST } from '../../constants';

const defaultMaxAge = 60 * 60 * 8; // 8 hours
export const defaultOptions: CookieSerializeOptions = {
  maxAge: defaultMaxAge, // 8 hours
  expires: new Date(Date.now() + defaultMaxAge * 1000),
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'lax',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setCookieSessionRequest(value: any) {
  let formattedValue = value;
  if (typeof formattedValue !== 'string')
    formattedValue = JSON.stringify(value);
  setNookiesCookie(null, SESSION_TOKEN_REQUEST, formattedValue, defaultOptions);
}

function getCookieSessionRequest() {
  const { [SESSION_TOKEN_REQUEST]: token } = parseCookies();
  return token;
}

function destroyCookieSessionRequest() {
  destroyCookie(null, SESSION_TOKEN_REQUEST, {
    maxAge: -1,
    path: '/',
  });
}

export {
  setCookieSessionRequest,
  getCookieSessionRequest,
  destroyCookieSessionRequest,
};
