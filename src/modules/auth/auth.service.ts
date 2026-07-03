import { IJwtPayload, IUserResponse } from "../../types/index.js";
import { AppError } from "../../utils/AppError.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { IAuthRepository } from "./auth.interface.js";
import { toUserResponse } from "./auth.mapper.js";
import {
  loginUserDTO,
  logoutUserDto,
  refreshTokenDTO,
  registerUserDTO,
} from "./auth.schema.js";


export class AuthService {
  constructor(private readonly repo: IAuthRepository) {}

  async registerUser(body: registerUserDTO) {
    const { username, email, password } = body;

    const existingUserByUsername = await this.repo.findUserByUsername(username);
    if (existingUserByUsername) {
      throw new AppError("User already exists", 400);
    }

    const existingUserByEmail = await this.repo.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new AppError("User already exists", 400);
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await this.repo.createUser(username, email, hashedPassword);

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const hashedRefreshToken = hashRefreshToken(refreshToken);

    await this.repo.createRefreshToken({
      token: hashedRefreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      user: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  }
  async loginUser(body: loginUserDTO) {
    const { email, password } = body;

    const user = await this.repo.findUserByEmail(email);

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

    await this.repo.createRefreshToken({
      token: hashedRefreshtoken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(body: refreshTokenDTO) {
    const { token } = body;
    if (!token) {
      throw new AppError("Token is required", 401);
    }
    let decoded: IJwtPayload;
    try {
      decoded = verifyRefreshToken(token) as IJwtPayload;
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
    const hashedToken = hashRefreshToken(token);

    const existingToken = await this.repo.findRefreshToken(hashedToken);
    if (!existingToken) {
      throw new AppError("Refresh token not found", 403);
    }

    //  Rotating the token

    await this.repo.deleteRefreshTokenById(existingToken.id);

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    const newRefreshTokenHashed = hashRefreshToken(newRefreshToken);

    await this.repo.createRefreshToken({
      token: newRefreshTokenHashed,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getCurrentUser(user: IUserResponse) {
    return {
      user: toUserResponse(user),
    };
  }
  async logout(body: logoutUserDto) {
    const { refreshToken } = body;
    if (!refreshToken) {
      throw new AppError("Refresh Token required", 400);
    }
    const refreshTokenHashed = hashRefreshToken(refreshToken);
    const existingToken = await this.repo.findRefreshToken(refreshTokenHashed);

    if (!existingToken) {
      return;
    }
    await this.repo.deleteRefreshTokenById(existingToken.id);
  }

  async logoutAllDevices(userId: string) {
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }
    await this.repo.deleteAllRefreshTokensByUserId(userId);
  }

  async authenticate(token:string){
    const decoded=verifyAccessToken(token) as IJwtPayload
    const user=await this.repo.findUserById(decoded.userId);
    if(!user){
      throw new AppError("Unauthorized request",401)
    }
    return user
  }
}
