import { IJwtPayload } from "../../types/index.js";
import { AppError } from "../../utils/AppError.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { toUserResponse } from "./auth.mapper.js";
import { authRepository } from "./auth.repository.js";
import { loginUserDTO, refreshTokenDTO, registerUserDTO } from "./auth.schema.js";

export const authService = {
  registerUser: async (body: registerUserDTO) => {
    const { username, email, password } = body;

    const existingUserByUsername =
      await authRepository.findUserByUsername(username);
    if (existingUserByUsername) {
      throw new AppError("User already exists", 400);
    }

    const existingUserByEmail = await authRepository.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new AppError("User already exists", 400);
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await authRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const hashedRefreshToken = hashRefreshToken(refreshToken);

    await authRepository.createRefreshtoken({
      token: hashedRefreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      newUser: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  },

  loginUser: async (body: loginUserDTO) => {
    const { email, password } = body;

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid Credentials", 404);
    }

    const isPassword = await comparePassword(password, user.password);

    if (!isPassword) {
      throw new AppError("Invalid Credentials", 401);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const hashedRefreshtoken = hashRefreshToken(refreshToken);

    await authRepository.createRefreshtoken({
      token: hashedRefreshtoken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  },
  refreshToken: async (body:refreshTokenDTO) => {
    const {token}=body
    if (!token) {
      throw new AppError("Token is required", 401);
    }
    let decoded;
    try {
      decoded = verifyRefreshToken(token) as IJwtPayload;
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
    const hashedToken = hashRefreshToken(token);

    const existingToken = await authRepository.findRefreshToken(hashedToken);
    if (!existingToken) {
      throw new AppError("Refresh token not found", 403);
    }

    //Rotating the token

    await authRepository.deleteRefreshTokenById(existingToken.id);

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    const newRefreshTokenHashed = hashRefreshToken(newRefreshToken);

    await authRepository.createRefreshtoken({
      token: newRefreshTokenHashed,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return{
      accessToken:newAccessToken,
      refreshToken:newRefreshToken
    }
  },
};
