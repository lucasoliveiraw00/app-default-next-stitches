import { NextApiRequest, NextApiResponse } from 'next';

import { MiddlewareCors } from './types';

export function initMiddleware(middleware: MiddlewareCors) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
