import {
  AuthSession,
  SessionPermission,
  SessionUser,
} from '../../../../server/types';

export type AuthContextProps<T> = AuthSession<T> & {
  isAuthenticated: boolean;
  user: SessionUser<T> | null;
  permissions: SessionPermission | null;
  hasPermission: (permission: string) => boolean;
};
