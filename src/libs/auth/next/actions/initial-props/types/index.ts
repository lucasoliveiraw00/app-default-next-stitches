import { NextPageContext } from 'next';

import { AuthSession } from '../../../../server/types';

export type Handler = (
  ctx: NextPageContext,
) => Promise<Record<string, unknown> & AuthSession>;
