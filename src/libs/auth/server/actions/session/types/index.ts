import { NextApiRequest, NextApiResponse } from 'next';

import { ConfigAuth } from '../../../config/types';

import { AuthSessionResponse, AuthSessionResponseError } from '../../../types';

export type SessionProps = {
  request: NextApiRequest;
  response: NextApiResponse<AuthSessionResponse | AuthSessionResponseError>;
  configAuth: ConfigAuth;
  callback?: (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => Promise<void> | void;
};
