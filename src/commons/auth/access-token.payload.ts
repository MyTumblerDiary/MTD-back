export type AccessTokenPayload = {
  email: string;
  sub: string;
  iat?: number;
  exp?: number;
};
