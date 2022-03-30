import * as Sentry from '@sentry/browser';
import { CookieSerializeOptions } from 'cookie';
import { destroyCookie } from 'nookies';
import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {
  PREFIX_BASE_AUTH,
  PREFIX_BASE_PERMISSION,
  PREFIX_BASE_SESSION,
} from '../../../../libs/auth/constants/session';

export function interceptorRequest(
  config: AxiosRequestConfig,
): AxiosRequestConfig {
  Sentry.setExtra('Interceptor Request', config);
  return config;
}

export function interceptorRequestError(
  error: AxiosError,
): AxiosPromise<AxiosError> {
  Sentry.captureException(error);

  return Promise.reject(error);
}

export function interceptorResponse(response: AxiosResponse): AxiosResponse {
  Sentry.setExtra('Interceptor Response', response);

  return response;
}

export function interceptorResponseError(
  error: AxiosError,
): AxiosPromise<AxiosError> {
  const statusCode = error.response?.status ?? 0;

  if (statusCode === 401 && typeof window !== 'undefined') {
    const options: CookieSerializeOptions = {
      maxAge: -1,
      path: '/',
    };

    destroyCookie(
      undefined,
      `${PREFIX_BASE_SESSION}${PREFIX_BASE_AUTH}`,
      options,
    );
    destroyCookie(
      undefined,
      `${PREFIX_BASE_SESSION}${PREFIX_BASE_PERMISSION}`,
      options,
    );
    window.location.replace('/login');
  }

  Sentry.captureException(error);

  return Promise.reject(error);
}
