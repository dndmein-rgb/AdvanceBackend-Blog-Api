import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { AuthService } from "../modules/auth/auth.service.js";


export const verifyUser =
  (authService: AuthService) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<void> => {
    try {
      const authHeader = req.header("Authorization");

      const token =
        req.cookies?.accessToken ||
        (authHeader?.startsWith("Bearer ")
          ? authHeader.substring(7)
          : undefined);

      if (!token) {
        throw new AppError("Unauthorized", 401);
      }

      req.user = await authService.authenticate(token);

      next();
    } catch (error) {
      next(
        error instanceof AppError
          ? error
          : new AppError("Invalid or expired token", 401),
      );
    }
  };