import { NextApiRequest, NextApiResponse } from 'next';

import { serialize, parse } from 'cookie';

import { DefaultOptionsCookie, OptionsCookie } from './types';

export const defaultMaxAge = 60 * 60 * 8; // 8 hours

const defaultOptionsCookie: DefaultOptionsCookie = {
  maxAge: defaultMaxAge, // 8 hours
  expires: new Date(Date.now() + defaultMaxAge * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'lax',
};

export function setCookie(
  nameCookie: string,
  token: string,
  response: NextApiResponse,
  options: OptionsCookie = {},
): NextApiResponse {
  const {
    maxAge = defaultOptionsCookie.maxAge, // 8 hours
    expires = defaultOptionsCookie.expires,
    httpOnly = defaultOptionsCookie.httpOnly,
    secure = defaultOptionsCookie.secure,
    path = defaultOptionsCookie.path,
    sameSite = defaultOptionsCookie.sameSite,
  } = options;

  const cookie = serialize(nameCookie, token, {
    maxAge,
    expires,
    httpOnly,
    secure,
    path,
    sameSite,
  });
  response.setHeader('Set-Cookie', cookie);
  return response;
}

export function removeCookie(
  nameCookie: string | string[],
  response: NextApiResponse,
): NextApiResponse {
  const namesCookies = nameCookie;
  if (Array.isArray(namesCookies)) {
    const cookies = namesCookies.map(name =>
      serialize(name, '', {
        maxAge: -1,
        path: '/',
      }),
    );
    response.setHeader('Set-Cookie', cookies);
    return response;
  }
  const cookie = serialize(namesCookies, '', {
    maxAge: -1,
    path: '/',
  });
  response.setHeader('Set-Cookie', cookie);
  return response;
}

export function parseCookies(req: NextApiRequest) {
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getCookie(nameCookie: string, req: NextApiRequest) {
  const cookies = parseCookies(req);
  return cookies[nameCookie];
}
