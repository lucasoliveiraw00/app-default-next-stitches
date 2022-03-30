/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from 'next';

import Iron from '@hapi/iron';

import { defaultMaxAge, setCookie } from '../../utils/cookie';

import { PREFIX_BASE_SESSION } from '../../../constants/session';

import { OptionsCookie } from '../../utils/cookie/types';

import { Session } from './types';

const PASSWORD = process.env.AUTH_COOKIE_PASSWORD;

export async function setSession(
  nameSession: string,
  session: any,
  response: NextApiResponse,
  options: OptionsCookie = {},
): Promise<NextApiResponse> {
  const password = PASSWORD;

  if (!password) {
    throw new Error(`auth: Bad use. AUTH_COOKIE_PASSWORD key required.`);
  }

  if (password.length < 32) {
    throw new Error(
      `auth: Bad usage. Password must be at least 32 characters long.`,
    );
  }

  const dateCreatedAt = new Date(Date.now());
  const maxAge = options?.maxAge || defaultMaxAge;
  const dateExpiresAt = new Date(Date.now() + maxAge * 1000);

  const newSession: Session = {
    data: session,
    createdAt: dateCreatedAt.toISOString(),
    expiresAt: dateExpiresAt.toISOString(),
  };

  const token = await Iron.seal(newSession, PASSWORD, Iron.defaults);

  const updatedResponse = setCookie(
    `${PREFIX_BASE_SESSION}${nameSession}`,
    token,
    response,
    options,
  );
  return updatedResponse;
}
