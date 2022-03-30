import { setSession } from '../../session';

import { PREFIX_BASE_AUTH } from '../../../constants/session';

import { filteredErrorData } from '../../../utils/error';

import { signInSchema } from './schemas';

import { Login, SignInProps } from './types';

export async function signIn(props: SignInProps) {
  const { request, response, signIn: functionSignIn, callback } = props;

  if (!functionSignIn)
    throw new Error('auth: Bad use. Required fetch function');

  try {
    if (request.method !== 'POST') throw new Error();
    const body = request.body as Login;
    const isValidDataBody = await signInSchema.isValid(body);
    if (!isValidDataBody) throw new Error();

    const responseFetch = await functionSignIn(body, request, response);

    if (!responseFetch) throw new Error();

    await setSession(PREFIX_BASE_AUTH, responseFetch, response);

    if (callback) callback(responseFetch, request, response);

    return response
      .status(200)
      .json({ isAuthenticated: true, data: responseFetch });
  } catch (error) {
    const { message } = filteredErrorData(error);
    return response.status(400).json({
      type: 'error',
      message: message || 'Invalid request',
    });
  }
}
