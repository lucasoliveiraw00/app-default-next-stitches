import { NextApiRequest, NextApiResponse } from 'next';

import { AuthSessionResponseError } from '../../../types';

export type Login = {
  userName: string;
  password: string;
};

export type ResponseFetch = Record<
  string,
  string | number | boolean | undefined | null
>;

export type SignIn = (
  credentials: Login,
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<ResponseFetch | undefined | null>;

export type SignInCallback = (
  data: ResponseFetch,
  req: NextApiRequest,
  res: NextApiResponse,
) => void;

type AuthSessionResponse = {
  isAuthenticated: boolean;
  data: Record<string, string | number | boolean | undefined | null>;
};

export type SignInProps = {
  request: NextApiRequest;
  response: NextApiResponse<AuthSessionResponse | AuthSessionResponseError>;
  signIn: SignIn;
  callback?: SignInCallback;
};
