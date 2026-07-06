import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { commentService } from "./comment.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const { postId } = req.params as { postId: string };
    const result = await commentService.createComment(
      postId,
      req.user?.id as string,
      req.body,
    );
    sendResponse(res, 201, {
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  },
);

export const deleteCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const {commentId}=req.params as {commentId:string};
    const result=await commentService.deleteComment(commentId,req.user?.id as string)

     sendResponse(res, 201, {
      success: true,
      message: "Comment deleted successfully",
      data: result,
    });
  },
);
