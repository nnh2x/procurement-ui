export interface User {
  id: string;
  email: string;
  tenantId: string;
  planCode: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
