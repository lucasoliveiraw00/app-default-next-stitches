import Router from 'next/router';

import { mutate } from 'swr';

import { fetchApi } from '../../../utils/fetch';

import { SET_PERMISSION, SESSION } from '../../../constants/routes';

import { filteredErrorData } from '../../../utils/error';

import { SetPermissionResponse, Options } from './types';

export async function setPermission(
  options?: Options,
): Promise<SetPermissionResponse> {
  const { redirect = false } = options || {};
  try {
    const response = await fetchApi.post(SET_PERMISSION);
    mutate(SESSION);
    if (redirect) Router.replace(redirect);
    return {
      permissions: response,
      redirect,
    };
  } catch (error) {
    const { message } = filteredErrorData(error);
    throw new Error(message || 'Erro interno.');
  }
}
