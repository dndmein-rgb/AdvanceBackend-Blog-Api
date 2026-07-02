import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);
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

    return sendResponse(res, 200, {
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  },
);

export const currentUserController=catchAsync(async(req:Request,res:Response)=>{
  const result=await authService.getCurrentUser(req.user! )

sendResponse(res,200,{
    success:true,
    message:"User details fetched succesfully",
    data:result
})
}

)
