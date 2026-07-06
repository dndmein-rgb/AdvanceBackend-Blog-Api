import express from "express";
import { verifyUser } from "../../middleware/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";
import { createCommentController ,deleteCommentController } from "./comment.controller.js";

const router=express.Router();

router.route("/create/post/:postId").post(verifyUser(authService),validate(createCommentSchema),createCommentController)

router.route("/delete/:commentId").delete(verifyUser(authService),deleteCommentController)

export default router;