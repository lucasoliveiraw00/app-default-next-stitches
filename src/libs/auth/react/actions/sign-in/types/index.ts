export type BodyData = {
  userName: string;
  password: string;
};

export type Options = {
  redirect?: string;
};

export type SignInResponse<T> = {
  isAuthenticated: boolean;
  data: T;
  redirect?: string | false;
};
