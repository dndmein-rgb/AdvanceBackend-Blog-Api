import jwt, { SignOptions } from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_SECRET,
  NODE_ENV,
} from "../config/config.js";
import { Response } from "express";

const ACCESS_TOKEN_SECRET = JWT_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = JWT_ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY =
  JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

const isProduction = NODE_ENV === "production";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure: isProduction,
    sameSite: "lax",
    maxAge:30 * 24 * 60 * 60 * 1000,
  })
};

export const destroyCookies=(res:Response)=>{
  res.clearCookie("accessToken",{
    httpOnly:true,
    secure: isProduction,
    sameSite: "lax",
    maxAge:24 * 60 * 60 * 1000,
  });
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure: isProduction,
    sameSite: "lax",
    maxAge:30 * 24 * 60 * 60 * 1000,
  });
}
