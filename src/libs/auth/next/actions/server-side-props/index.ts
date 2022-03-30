import { GetServerSidePropsContext } from 'next';

import { parse } from 'cookie';

import { fetchApi } from '../../../utils/fetch';

import { getPropertyDescriptorForReqSession } from '../../../utils/property-descriptor-session';

import { SESSION } from '../../../constants/routes';

import { AuthSessionResponse } from '../../../server/types';

import { AuthOptions } from '../../types';

import { Handler, ServerSideSessionPropsResult } from './types';

function redirect(url: string) {
  return {
    redirect: {
      destination: url,
      permanent: true,
    },
  };
}

export function serverSideSessionProps<Props>(
  options?: AuthOptions,
  handler?: Handler<Props>,
) {
  return async function handleServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<ServerSideSessionPropsResult<Props | Record<string, unknown>>> {
    const { req: request, resolvedUrl } = ctx;

    const {
      requireAuthentication = true,
      requirePermission = undefined,
      redirectUnauthorized,
    } = options || {};

    const body = parse(request?.headers.cookie || '');

    const currentPage = {
      name: resolvedUrl,
    };

    const responseSession: AuthSessionResponse = await fetchApi.post(SESSION, {
      ...body,
      currentPage,
    });

    const redirectPage = responseSession?.redirect || '/';

    function isRedirectAuthentication() {
      if (!requireAuthentication) return false;
      if (!responseSession) return true;
      const {
        isAuthenticated,
        redirect: redirectSession,
        session,
      } = responseSession;
      if (!isAuthenticated && !redirectSession) return false;
      if (!session || !session.user) return true;
      if (isAuthenticated && redirectSession) return true;
      return false;
    }
    if (isRedirectAuthentication()) {
      const filteredRedirectPage = redirectUnauthorized || redirectPage;
      if (filteredRedirectPage !== currentPage.name)
        return redirect(filteredRedirectPage);
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
      const filteredRedirectPage = redirectUnauthorized || redirectPage;
      if (filteredRedirectPage !== currentPage.name)
        return redirect(filteredRedirectPage);
    }

    Object.defineProperty(
      ctx.req,
      'session',
      getPropertyDescriptorForReqSession(responseSession?.session),
    );

    function handleConcatSessionResponse(
      response: ServerSideSessionPropsResult<Props>,
    ) {
      if (!response.props || !responseSession?.session) return response;
      response.props = {
        ...response.props,
        session: {
          ...responseSession?.session,
          ...response.props?.session,
        },
      };
      return response;
    }

    if (handler) {
      const responseHandler = await handler(ctx);
      return handleConcatSessionResponse(responseHandler);
    }

    return {
      props: { session: ctx.req?.session || undefined },
    };
  };
}
