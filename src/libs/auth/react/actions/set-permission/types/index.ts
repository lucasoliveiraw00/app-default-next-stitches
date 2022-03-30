type SetPermissionResponseError = {
  type: string;
  message: string;
};

export type SetPermissionResponse =
  | {
      permissions: string[];
      redirect?: string | false;
    }
  | SetPermissionResponseError;

export type Options = {
  redirect?: string;
};
