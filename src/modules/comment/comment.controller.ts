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

export const getCommentsByPostIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { postId } = req.params as { postId: string };
    const { cursor, limit } = req.query;

    const parsedLimit = limit ? parseInt(limit as string) : 10;
    const result = await commentService.getCommentsByPostId(
      postId,
      parsedLimit,
      cursor as string,
    );

    sendResponse(res, 200, {
      success: true,
      message: "Comments fetched successfully",
      data: {
        result,
        meta: {
          nextCursor: result.length > 0 ? result[result.length - 1] : null,
        },
      },
    });
  },
);

export const deleteCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const { commentId } = req.params as { commentId: string };
    const result = await commentService.deleteComment(
      commentId,
      req.user?.id as string,
    );

    sendResponse(res, 200, {
      success: true,
      message: "Comment deleted successfully",
      data: result,
    });
  },
);
