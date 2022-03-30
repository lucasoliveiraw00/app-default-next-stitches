import { NextApiRequest, NextApiResponse } from 'next';

export type signOut = {
  request: NextApiRequest;
  response: NextApiResponse;
  callback?: (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => Promise<void> | void;
};
