import axios, { AxiosRequestConfig } from 'axios';

import * as Sentry from '@sentry/browser';

import { getCookieSessionRequest } from '../../utils/cookie';

import {
  interceptorRequestError,
  interceptorResponse,
  interceptorResponseError,
} from '../../utils/interceptor';

const token = getCookieSessionRequest();

const BASE_URL = process.env.APP_API_BASE_URL_DASHBOARD;

const apiDashboard = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : null),
  },
});

function interceptorRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  Sentry.setExtra('Interceptor Request', config);
  const configAxios = config;
  if (configAxios.headers?.Authorization) return config;
  const tokenRequest = getCookieSessionRequest();
  configAxios.headers = {
    ...configAxios.headers,
    Authorization: `Bearer ${tokenRequest}`,
  };
  return configAxios;
}

apiDashboard.interceptors.request.use(
  interceptorRequest,
  interceptorRequestError,
);

apiDashboard.interceptors.response.use(
  interceptorResponse,
  interceptorResponseError,
);

export { apiDashboard };
