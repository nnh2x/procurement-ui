export interface User {
  id: string;
  email: string;
  tenantId: string;
  planCode: string;
  role?: string;
  permissions?: Array<{ module: string; actions: string[] }>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
