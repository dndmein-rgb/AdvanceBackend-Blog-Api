import express from "express";
import { verifyUser } from "../../middleware/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";

const router=express.Router();

router.route("/create").post(verifyUser(authService),validate(createCommentSchema))

export default router;