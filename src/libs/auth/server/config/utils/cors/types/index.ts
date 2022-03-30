/* eslint-disable @typescript-eslint/no-explicit-any */
import { CorsRequest } from 'cors';

export type MiddlewareCors = (
  req: CorsRequest,
  res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
  },
  next: (err?: any) => any,
) => void;
