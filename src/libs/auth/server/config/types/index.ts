import { NextApiRequest, NextApiResponse } from 'next';

import { SetPermissionResponse } from '../../actions/set-permission/types';

import { SignIn, SignInCallback } from '../../actions/sign-in/types';

type FunctionCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => void | Promise<void>;

export type DefaultPages = {
  default: string;
  signIn: string;
};

export type PublicPages = {
  [key: string]: string | undefined;
  signIn?: '/login' | string | undefined;
};

export type Auth = {
  callback?: {
    signIn?: SignInCallback;
    signOut?: FunctionCallback;
    session?: FunctionCallback;
  };
  defaultPages: DefaultPages;
  publicPages: {
    [key: string]: string | undefined;
  };
  signIn: SignIn;
  setPermission?: SetPermissionResponse;
};

export type ConfigAuth = {
  method: string | undefined;
  originUrl: string | undefined;
  defaultPages: DefaultPages;
  publicPages: PublicPages;
  originHost: {
    protocol: string;
    host: string;
    origin: string;
  };
};
