export interface LoginRes {
  token: TokenRes,
  user: TknUser
}

export interface TokenRes {
    type:         string;
    token:        string;
    refreshToken: null;
}

export interface TknUser {
  id: number;
  username: string;
  email: string;
  created_at:  Date;
  updated_at:  Date;
}
