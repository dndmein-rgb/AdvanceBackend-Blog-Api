import { prisma } from "../../lib/prisma.js";
import {
  IAuthRepository,
  ICreateRefreshTokenDTO,
} from "./auth.interface.js"

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
  async findUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ) {
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
  ) {
    return prisma.refreshToken.create({
      data,
    });
  }

  async findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async findRefreshTokensByUserId(userId: string) {
    return prisma.refreshToken.findMany({
      where: { userId },
    });
  }

  async deleteRefreshTokenById(id: string) {
    return prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteRefreshTokenByToken(token: string) {
    return prisma.refreshToken.delete({
      where: { token },
    });
  }

  async deleteAllRefreshTokensByUserId(userId: string) {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}