export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type Payload = {
  email: string;
  user_id: number;
  exp: number;
  iat: number;
};
