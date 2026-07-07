import express from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";
import { createCommentController ,deleteCommentController, getCommentsByPostIdController } from "./comment.controller.js";
import { authenticate } from "../auth/auth.route.js";


const router=express.Router();


router.route("/create/post/:postId").post(authenticate,validate(createCommentSchema),createCommentController)

router.route("/:postId").get(authenticate,getCommentsByPostIdController)

router.route("/delete/:commentId").delete(authenticate,deleteCommentController)

export default router;