import { RefreshToken, User } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { IAuthRepository, ICreateRefreshTokenDTO } from "./auth.interface.js";

// AuthService
//       │
//       ▼
// IAuthRepository
//       ▲
//       │
// PrismaAuthRepository
//       │
//       ▼
// Prisma

export class PrismaAuthRepository implements IAuthRepository {
  async findUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    return prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async createRefreshToken(
    data: ICreateRefreshTokenDTO,
  ): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data,
    });
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async findRefreshTokensByUserId(userId: string): Promise<RefreshToken[]> {
    return prisma.refreshToken.findMany({
      where: { userId },
    });
  }

  async deleteRefreshTokenById(id: string): Promise<void> {
    prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteRefreshTokenByToken(token: string): Promise<void> {
    prisma.refreshToken.delete({
      where: { token },
    });
  }

  async deleteAllRefreshTokensByUserId(
    userId: string,
  ): Promise<{ count: number }> {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
