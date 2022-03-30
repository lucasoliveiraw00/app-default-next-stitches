import { NextApiRequest, NextApiResponse } from 'next';

export type ResponseFetch = string[];

export type SetPermissionResponse = (
  req: NextApiRequest,
  res: NextApiResponse,
) => ResponseFetch | Promise<ResponseFetch>;

export type SetPermission = {
  request: NextApiRequest;
  response: NextApiResponse;
  fetch?: SetPermissionResponse;
};
