import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { commentService } from "./comment.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createCommentController=catchAsync(async(req:Request,res:Response)=>{
    const {id:postId}=req.params as {id:string};
    const result=await commentService.createComment(postId,req.user?.id as string,req.body)
    sendResponse(res,201,{
        success:true,
        message:"Comment created successfully",
        data:result
    })
})