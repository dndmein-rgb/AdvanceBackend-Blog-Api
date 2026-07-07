import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";

import { postService } from "./post.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createPostController = catchAsync(
  async (req: Request, res: Response) => {
    let result;
    if (req.file?.path) {
      result = await postService.createPost(
        req.body,
        req.user?.id as string,
        req.file.path,
      );
    } else {
      result = await postService.createPost(req.body, req.user?.id as string);
    }
    sendResponse(res, 201, {
      success: true,
      message: "Post created successfully",
      data: result,
    });
  },
);

export const getUserPostController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await postService.getUserPosts(req.user?.id as string);
    sendResponse(res, 200, {
      success: true,
      message: "User posts fetched successfully",
      data: result,
    });
  },
);

export const getAllPostsController = catchAsync(
  async (req: Request, res: Response) => {
    const { cursor, limit } = req.query;
    const parsedLimit = limit ? parseInt(limit as string) : 10;
    const result = await postService.getAllPosts(cursor as string, parsedLimit);
    sendResponse(res, 200, {
      success: true,
      message: "Posts fetched successfully",
      data: {
        result,
        meta: {
          nextCursor: result.length > 0 ? result[result.length - 1].id : null,
        },
      },
    });
  },
);

export const updatePostController = catchAsync(
  async (req: Request, res: Response) => {
    const { id: postId } = req.params as { id: string };
    const result = await postService.updatePost(
      postId,
      req.user?.id as string,
      req.body,
    );

    sendResponse(res, 200, {
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  },
);

export const deletePostController = catchAsync(
  async (req: Request, res: Response) => {
    const { id: postId } = req.params as { id: string };
    const result = await postService.deletePost(postId, req.user?.id as string);

    sendResponse(res, 200, {
      success: true,
      message: "Post deleted successfully",
    });
  },
);
