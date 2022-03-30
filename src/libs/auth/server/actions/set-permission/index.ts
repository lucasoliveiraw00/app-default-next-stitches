import { setSession } from '../../session';

import { PREFIX_BASE_PERMISSION } from '../../../constants/session';

import { filteredErrorData } from '../../../utils/error';

import { SetPermission } from './types';

export async function setPermission(props: SetPermission) {
  const { request, response, fetch } = props;

  if (!fetch) throw new Error('auth: Bad use. Required fetch function');

  try {
    if (request.method !== 'POST') throw new Error();
    const responseFetch = await fetch(request, response);
    if (!responseFetch) throw new Error();
    await setSession(PREFIX_BASE_PERMISSION, responseFetch, response);
    return response.status(201).end();
  } catch (error) {
    const { message } = filteredErrorData(error);
    return response.status(400).json({
      type: 'error',
      message: message || 'Invalid request',
    });
  }
}
