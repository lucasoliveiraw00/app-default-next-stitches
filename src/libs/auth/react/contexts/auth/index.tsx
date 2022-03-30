import React, { createContext, useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useFetcherCache } from '../../hooks/useFetcherCache';

import { SESSION } from '../../../constants/routes';

import { AuthSessionResponse } from '../../../server/types';

import { AuthContextProps, AuthProviderProps } from './types';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = (props: AuthProviderProps) => {
  const { auth = null, children } = props;

  const { data: responseSession, error } = useFetcherCache<
    AuthSessionResponse | undefined
  >(SESSION);

  const { pathname: currentPage } = useRouter();

  const session = responseSession?.session || null;
  const isAuthenticated = responseSession?.isAuthenticated || false;
  const redirectPage = responseSession?.redirect || '/';

  const isRedirectPermission = useMemo(() => {
    if (!auth) return false;
    const { requirePermission } = auth;
    if (!requirePermission) return false;
    if (!responseSession) return false;
    if (!session) return false;
    const { permissions } = session;
    if (!permissions?.data) return false;
    const { data } = permissions;
    let isPermission = data === requirePermission;
    if (Array.isArray(data))
      isPermission = !!data.find(value => value === requirePermission);
    if (!isPermission) return true;
    return false;
  }, [auth, responseSession, session]);

  const isRedirectAuthentication = useMemo(() => {
    if (!auth) return false;
    const { requireAuthentication } = auth;
    if (!requireAuthentication) return false;
    if (!responseSession) return true;
    const { redirect } = responseSession;
    if (!isAuthenticated && !redirect) return false;
    if (!session || !session.user) return true;
    if (isAuthenticated && redirect) return true;
    return false;
  }, [auth, isAuthenticated, responseSession, session]);

  const handleHasPermission = useCallback(
    (permission: string) => {
      if (!session || !permission) return false;
      const { permissions } = session;
      if (!permissions?.data) return false;
      const { data } = permissions;
      let isPermission = data === permission;
      if (Array.isArray(data))
        isPermission = !!data.find(value => value === permission);
      if (!isPermission) return true;
      return false;
    },
    [session],
  );

  const memoizedValue = useMemo(
    () => ({
      isAuthenticated: responseSession?.isAuthenticated ?? false,
      session: responseSession?.session,
      user: responseSession?.session?.user || null,
      permissions: responseSession?.session?.permissions || null,
      hasPermission: handleHasPermission,
    }),
    [responseSession, handleHasPermission],
  );

  if (!responseSession && !error) return null;

  if (isRedirectAuthentication) {
    const replacePage = auth?.redirectUnauthorized || redirectPage;
    if (replacePage !== currentPage) window.location.replace(replacePage);
  }

  if (isRedirectPermission) {
    const replacePage = auth?.redirectUnauthorized || redirectPage;
    if (replacePage !== currentPage) window.location.replace(replacePage);
  }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
