import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { authService } from "./auth.container.js";
import { destroyCookies, setCookies } from "../../utils/jwt.helper.js";


export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    setCookies(res, result.accessToken, result.refreshToken);
    sendResponse(res, 201, {
      success: true,
      message: "Account created successfully",
      data: result,
    });
  },
);

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    setCookies(res, result.accessToken, result.refreshToken);

    sendResponse(res, 200, {
      success: true,
      message: "Logged in successfully",
      data: result,
    });
  },
);

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.refreshToken(req.body);

    setCookies(res, result.accessToken, result.refreshToken);

    return sendResponse(res, 200, {
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  },
);

export const currentUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.getCurrentUser(req.user!);

    sendResponse(res, 200, {
      success: true,
      message: "User details fetched succesfully",
      data: result,
    });
  },
);
export const logoutUserController = catchAsync(
  async (req: Request, res: Response) => {
    // const {refreshToken}=req.body;

    const result = await authService.logout(req.body);

    destroyCookies(res);

    sendResponse(res, 200, {
      success: true,
      message: "Logged out successfully",
    });
  },
);

export const logoutFromAllDevicesController = catchAsync(
  async (req: Request, res: Response) => {
    await authService.logoutAllDevices(req.user?.id as string);

    destroyCookies(res);

    sendResponse(res, 200, {
      success: true,
      message: "Logged out from all devices",
    });
  },
);
