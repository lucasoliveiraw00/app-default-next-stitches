/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextPageContext } from 'next';

import { parse } from 'cookie';

import { fetchApi } from '../../../utils/fetch';

import { getPropertyDescriptorForReqSession } from '../../../utils/property-descriptor-session';

import { SESSION } from '../../../constants/routes';

import { AuthOptions } from '../../types';

import { AuthSession, AuthSessionResponse } from '../../../server/types';

import { Handler } from './types';

export function initialSessionProps(options?: AuthOptions, handler?: Handler) {
  return async function handleInitialProps(
    ctx: NextPageContext,
  ): Promise<AuthSession | any> {
    const { req: request, pathname } = ctx;

    const {
      requireAuthentication = true,
      requirePermission = undefined,
      redirectUnauthorized,
    } = options || {};

    const body = parse(request?.headers.cookie || '');

    const currentPage = {
      name: pathname,
    };

    const responseSession: AuthSessionResponse = await fetchApi.post(SESSION, {
      ...body,
      currentPage,
    });

    const redirectPage = responseSession?.redirect || '/';

    function isRedirectAuthentication() {
      if (!requireAuthentication) return false;
      if (!responseSession) return true;
      const { isAuthenticated, redirect, session } = responseSession;
      if (!isAuthenticated && !redirect) return false;
      if (!session || !session.user) return true;
      if (isAuthenticated && redirect) return true;
      return false;
    }
    if (isRedirectAuthentication()) {
      const locationPage = redirectUnauthorized || redirectPage;
      if (locationPage !== currentPage.name) {
        ctx.res?.writeHead(302, { Location: locationPage }).end();
        return {};
      }
    }

    function isRedirectPermission() {
      if (!requirePermission) return false;
      if (!responseSession) return true;
      const { session } = responseSession;
      if (!session) return true;
      const { permissions } = session;
      if (!permissions?.data) return false;
      const { data } = permissions;
      let isPermission = data === requirePermission;
      if (Array.isArray(data))
        isPermission = !!data.find(value => value === requirePermission);
      if (!isPermission) return true;
      return false;
    }
    if (isRedirectPermission()) {
      const locationPage = redirectUnauthorized || redirectPage;
      if (locationPage !== currentPage.name) {
        ctx.res?.writeHead(302, { Location: locationPage }).end();
        return {};
      }
    }

    Object.defineProperty(
      ctx.req,
      'session',
      getPropertyDescriptorForReqSession(responseSession?.session),
    );

    function handleConcatSessionResponse(
      response: Record<string, unknown> & AuthSession,
    ) {
      if (!response || !responseSession?.session) return response;
      const newResponse = {
        ...response,
        session: {
          ...responseSession?.session,
          ...response?.session,
        },
      };
      return newResponse;
    }

    if (handler) {
      const responseHandler = await handler(ctx);
      return handleConcatSessionResponse(responseHandler);
    }

    return { session: responseSession?.session };
  };
}
