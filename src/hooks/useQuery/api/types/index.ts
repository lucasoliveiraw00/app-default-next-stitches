import { QueryKey, UseQueryOptions } from 'react-query';

type Params = {
  [k: string]: string | number | null | undefined | Params;
};

export type QueryOptions<Data, Error> = {
  query?: QueryKey;
  params?: Params | null;
  optionsQuery?: UseQueryOptions<Data, Error>;
};
