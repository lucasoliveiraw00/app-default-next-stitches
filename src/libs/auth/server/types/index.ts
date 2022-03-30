/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface SessionUser<T = any> {
  data: T;
  createdAt: string;
  expiresAt: string;
}

export interface SessionPermission {
  data: string[] | string;
  createdAt: string;
  expiresAt: string;
}

export interface Session<T = null> {
  user?: SessionUser<T>;
  permissions?: SessionPermission | undefined;
}

export interface AuthSession<T = any> {
  session: Session<T> | undefined;
}

type DefaultPages = {
  default: string;
  signIn: string;
};
export interface AuthSessionResponse extends AuthSession {
  isAuthenticated: boolean;
  redirect: string | false;
  defaultPages: DefaultPages;
}
export interface AuthSessionResponseError {
  type: string;
  message: string;
}

declare module 'http' {
  interface IncomingMessage {
    session: Session | undefined;
  }
}
