import Router from 'next/router';

import { fetchApi } from '../../../utils/fetch';

import { SIGN_OUT } from '../../../constants/routes';

import { filteredErrorData } from '../../../utils/error';

import { Options, SignOutResponse } from './types';

export async function signOut(options: Options): Promise<SignOutResponse> {
  const { redirect } = options;

  if (!redirect) throw new Error();

  try {
    await fetchApi.post(SIGN_OUT);

    if (redirect) Router.replace(redirect);

    return {
      isAuthenticated: false,
      redirect,
    };
  } catch (error) {
    const { message } = filteredErrorData(error);
    throw new Error(message || 'Erro interno.');
  }
}
