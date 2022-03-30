import { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';

import { signIn, signOut, setPermission, session } from '../actions';

import {
  PREFIX_SESSION,
  PREFIX_SET_PERMISSION,
  PREFIX_SIGN_IN,
  PREFIX_SIGN_OUT,
} from '../../constants/routes';

import { initMiddleware } from './utils/cors';
import { absoluteUrl } from './utils/absolute-url';

import { Auth } from './types';

const baseUrl = process.env.AUTH_APP_URL;

const middlewareCors = initMiddleware(
  Cors({
    origin: baseUrl,
    credentials: true,
    methods: ['GET', 'POST'],
  }),
);

function handlerSetConfig(request: NextApiRequest, options: Auth) {
  const { url, headers } = request;
  const { defaultPages, publicPages } = options;
  const prefixUrl = url?.replace('api/auth/', '');
  const { referer } = headers;

  const originHost = absoluteUrl(request, referer || '');
  const originUrl = referer?.replace(originHost.origin, '');

  return {
    method: prefixUrl,
    originUrl: originUrl || request.body?.currentPage?.name || null,
    originHost,
    defaultPages,
    publicPages,
  };
}

export function auth(options: Auth) {
  return async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
  ) {
    await middlewareCors(request, response);
    const { url } = request;
    const prefixUrl = url?.replace('api/auth/', '');
    const configAuth = handlerSetConfig(request, options);
    switch (prefixUrl) {
      case PREFIX_SIGN_IN:
        return signIn({
          request,
          response,
          signIn: options.signIn,
          callback: options?.callback?.signIn,
        });
      case PREFIX_SIGN_OUT:
        return signOut({
          request,
          response,
          callback: options?.callback?.signOut,
        });
      case PREFIX_SET_PERMISSION:
        return setPermission({
          request,
          response,
          fetch: options.setPermission,
        });
      case PREFIX_SESSION:
        return session({
          request,
          response,
          configAuth,
          callback: options?.callback?.session,
        });
      default:
        return response.status(500).destroy();
    }
  };
}
