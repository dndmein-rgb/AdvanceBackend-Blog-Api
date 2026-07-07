import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { AppError } from "../utils/AppError.js";

export const validate =

//ZodTypeAny is preferred more than ZodObject because it is more generic
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      // return res.status(400).json({
      //   message: "Validation failed",
      //   errors,
      // });
      throw new AppError(errors.map((e)=>`${e.field}: ${e.message}`).join(", "), 400);
    }

    // overwriting with validated and sanitized data
    req.body = result.data;

    next();
  };
