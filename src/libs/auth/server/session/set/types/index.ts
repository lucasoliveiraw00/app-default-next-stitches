export interface Session {
  data: Record<string, string | number | boolean | undefined | null>;
  createdAt: string;
  expiresAt: string;
}
