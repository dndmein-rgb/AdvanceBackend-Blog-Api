import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config/config.js";

export async function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let error = { ...err };
  error.message = err.message;

  //default values
  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";

  if (NODE_ENV === "development") {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.status,
      stack: err.stack,
      error,
    });
  }

  //Production: hide internal details
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.status,
    });
  }

  //Unknown errors
  return res.status(500).json({
    message: "Something went wrong",
    status: "error",
  });
}
