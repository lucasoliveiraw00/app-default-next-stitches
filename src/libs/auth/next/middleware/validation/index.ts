// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '../../../utils/fetch';

import { SESSION } from '../../../constants/routes';

import { AuthSessionResponse } from '../../../server/types';
import { AuthOptions } from '../../types';

export function validationSession(options?: AuthOptions) {
  return async function handleMiddleware(request: NextRequest) {
    const {
      requireAuthentication = true,
      requirePermission = undefined,
      redirectUnauthorized,
    } = options || {};

    const currentPage = request.page;

    const { cookies } = request;
    const responseSession: AuthSessionResponse = await fetchApi.post(SESSION, {
      ...cookies,
      currentPage,
    });

    const redirectPage = responseSession?.redirect || '/';
    const urlRedirect = request.nextUrl.clone();
    urlRedirect.pathname = redirectUnauthorized || redirectPage;

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
      if (urlRedirect.pathname !== currentPage.name)
        return NextResponse.redirect(urlRedirect);
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
      if (urlRedirect.pathname !== currentPage.name)
        return NextResponse.redirect(urlRedirect);
    }

    return NextResponse.next();
  };
}
