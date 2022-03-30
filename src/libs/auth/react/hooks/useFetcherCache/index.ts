import useSWR from 'swr';

import { fetchApi } from '../../../utils/fetch';

import { FetchResponse } from './types';

export function useFetcherCache<T>(url: string): FetchResponse<T> {
  const { data, error, mutate } = useSWR(url, async currentUrl => {
    const response = await fetchApi.get(currentUrl);
    return response;
  });

  return { data, error, mutate };
}
