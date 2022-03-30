export type OptionsCookie = {
  maxAge?: number; // 8 hours
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
};

export type DefaultOptionsCookie = {
  maxAge: number;
  expires: Date;
  httpOnly: boolean;
  secure: boolean;
  path: string;
  sameSite: boolean | 'lax' | 'strict' | 'none' | undefined;
};
