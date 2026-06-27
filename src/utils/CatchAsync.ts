import { NextFunction, Request, Response } from "express";


// catchAsync doesn't execute controller. It takes the controller, wraps it inside another function, and returns that new function
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
