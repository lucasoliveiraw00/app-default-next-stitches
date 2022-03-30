export type Options = {
  redirect: string;
};

type SignOutResponseError = {
  type: string;
  message: string;
};

export type SignOutResponse =
  | {
      isAuthenticated: boolean;
      redirect: string;
    }
  | SignOutResponseError;
