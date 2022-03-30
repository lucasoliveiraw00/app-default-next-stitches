import Router from 'next/router';

import { mutate } from 'swr';

import { fetchApi } from '../../../utils/fetch';

import { SIGN_IN, SESSION } from '../../../constants/routes';

import { filteredErrorData } from '../../../utils/error';

import { signInSchema } from './schemas';

import { Options, BodyData, SignInResponse } from './types';

export async function signIn<T>(
  body: BodyData,
  options?: Options,
): Promise<SignInResponse<T>> {
  const { redirect = false } = options || {};

  try {
    const isValidDataBody = await signInSchema.isValid(body);
    if (!isValidDataBody) throw new Error();

    const response = await fetchApi.post(SIGN_IN, body);
    if (!response) throw new Error();

    mutate(SESSION);
    if (redirect) Router.replace(redirect);

    return {
      ...response,
      redirect,
    };
  } catch (error) {
    const { message } = filteredErrorData(error);
    throw new Error(message || 'Acesso inválido.');
  }
}
