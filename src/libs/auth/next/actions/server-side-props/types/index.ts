import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { AuthSession } from '../../../../server/types';

export type ServerSideSessionPropsResult<P> = GetServerSidePropsResult<P> & {
  props?: P & AuthSession;
};

export type Handler<P> = (
  ctx: GetServerSidePropsContext,
) => Promise<ServerSideSessionPropsResult<P>>;
