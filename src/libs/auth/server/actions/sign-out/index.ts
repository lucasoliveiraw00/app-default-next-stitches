import { removeSession } from '../../session';

import {
  PREFIX_BASE_AUTH,
  PREFIX_BASE_PERMISSION,
} from '../../../constants/session';

import { signOut } from './types';

export async function signOut(props: signOut) {
  const { request, response, callback } = props;
  if (callback) callback(request, response);
  removeSession([PREFIX_BASE_AUTH, PREFIX_BASE_PERMISSION], response);
  return response.status(201).end();
}
