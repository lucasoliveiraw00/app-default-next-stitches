/* eslint-disable @typescript-eslint/ban-types */
import { NextPage } from 'next';

import { AppProps } from 'next/app';

export type AuthOptions = {
  requireAuthentication?: boolean;
  requirePermission?: string;
  redirectUnauthorized?: string;
};

type AuthPage = {
  auth?: AuthOptions;
};

export declare type AuthNextPage<P = {}> = NextPage<P> & AuthPage;

export declare type AuthAppProps<P = {}> = AppProps<P> & {
  Component: AuthPage;
};
