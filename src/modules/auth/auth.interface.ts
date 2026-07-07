import { User, RefreshToken } from "@prisma/client";

export interface ICreateRefreshTokenDTO {
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface IAuthRepository {
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;

  createUser(username: string, email: string, password: string): Promise<User>;
  createRefreshToken(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  
  findRefreshToken(token: string): Promise<RefreshToken|null>;
  findRefreshTokensByUserId(userId: string): Promise<RefreshToken[]>;

  deleteRefreshTokenById(id: string): Promise<void>;
  deleteRefreshTokenByToken(token: string): Promise<void>;
  deleteAllRefreshTokensByUserId(userId: string): Promise<{ count: number }>;
}
