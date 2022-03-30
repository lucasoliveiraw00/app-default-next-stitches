import { useQuery as useReactQuery, UseQueryResult } from 'react-query';

import { apiDashboard } from '../../../../services/app';

import { QueryOptions } from '../types';

export function useQuery<Data, Error = unknown>(
  url: string,
  options?: QueryOptions<Data, Error>,
): UseQueryResult<Data, Error> {
  const {
    query = url,
    params = null,
    optionsQuery = undefined,
  } = options || {};
  const response = useReactQuery<Data, Error>(
    query,
    async () => {
      const { data } = await apiDashboard.get(url, { params });
      return data;
    },
    optionsQuery,
  );

  return response;
}

export { useQuery as useQueryDashboard };
