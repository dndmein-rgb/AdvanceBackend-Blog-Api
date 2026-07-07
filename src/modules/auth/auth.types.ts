import { IUserResponse } from "../../types/index.js";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: IUserResponse;
}

export interface CurrentUserResponse {
  user: IUserResponse;
}