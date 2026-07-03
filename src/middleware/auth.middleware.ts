// import { NextFunction, Request, Response } from "express";
// import { AppError } from "../utils/AppError.js";
// import { verifyAccessToken } from "../utils/jwt.helper.js";
// import { IJwtPayload } from "../types/index.js";
// import { authRepository } from "../modules/auth/auth.repository.js";

import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { IJwtPayload } from "../types/index.js";
import { AuthService } from "../modules/auth/auth.service.js";

// export const verifyUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const authHeader = req.header("Authorization");

//     const token =
//       req.cookies?.accessToken ||
//       (authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined);

//     if (!token) {
//       throw new AppError("Unauthorized", 401);
//     }

//     const decoded = verifyAccessToken(token) as IJwtPayload;

//     const user = await authRepository.findUserById(decoded.userId);

//     if (!user) {
//       throw new AppError("Unauthorized request", 401);
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     if (error instanceof AppError) {
//       return next(error);
//     }

//     return next(new AppError("Invalid or expired token", 401));
//   }
// };

export const verifyUser =
  (authService: AuthService) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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