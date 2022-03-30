import { ReactNode } from 'react';

import {
  AuthSession,
  SessionPermission,
  SessionUser,
} from '../../../../server/types';

import { AuthOptions } from '../../../../next/types';

export interface AuthProviderProps {
  children: ReactNode;
  auth?: AuthOptions | undefined;
}

export interface AuthContextProps extends AuthSession {
  isAuthenticated: boolean;
  user: SessionUser | null;
  permissions: SessionPermission | null;
  hasPermission: (permission: string) => boolean;
}
