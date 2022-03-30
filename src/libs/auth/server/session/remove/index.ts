import { NextApiResponse } from 'next';

import { removeCookie } from '../../utils/cookie';

import { PREFIX_BASE_SESSION } from '../../../constants/session';

export function removeSession(
  nameSession: string | string[],
  response: NextApiResponse,
): NextApiResponse {
  let namesSessions = nameSession;
  if (Array.isArray(nameSession))
    namesSessions = nameSession.map(name => `${PREFIX_BASE_SESSION}${name}`);
  removeCookie(namesSessions, response);
  return response;
}
