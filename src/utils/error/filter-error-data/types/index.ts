/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterErrorData = {
  type: 'error' | 'warning' | 'info' | 'success';
  typeCode: string | number | null;
  code: number | string;
  name: string;
  details: {
    [key: string]: string | string[];
  } | null;
  message: string;
  extra: any;
};
