import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";
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
