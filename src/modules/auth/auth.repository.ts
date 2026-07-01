import { prisma } from "../../lib/prisma.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { hashPassword } from "../../utils/auth.helper.js";

export const authRepository = {
  findUserByUsername: async (username: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  },
  findUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  },

  createUser: async (username: string, email: string, password: string) => {
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return createdUser;
  },

  createRefreshtoken: async (data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }) => {
    return await prisma.refreshToken.create({ data });
  },

  findRefreshToken: async (token: string) => {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });
    return refreshToken;
  },

  deleteRefreshTokenById:async(id:string)=>{
    return await prisma.refreshToken.delete({
      where:{id}
    })
  }
};
