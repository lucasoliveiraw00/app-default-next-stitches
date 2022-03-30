import { KeyedMutator } from 'swr';

export type FetchResponse<Data> = {
  data: Data | undefined;
  error?: Error;
  mutate: KeyedMutator<Data>;
};
