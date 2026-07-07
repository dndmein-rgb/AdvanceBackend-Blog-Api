import express from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";

import { upload } from "../../middleware/multer.middleware.js";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getUserPostController,
  updatePostController,
} from "./post.controller.js";
import { authenticate } from "../auth/auth.route.js";

const router = express.Router();

router.route("/").get(getAllPostsController);

router
  .route("/create")
  .post(
    authenticate,
    upload.single("media"),
    validate(createPostSchema),
    createPostController,
  );

router.route("/your-posts").get(authenticate, getUserPostController);
router
  .route("/:id")
  .patch(
    authenticate,
    validate(updatePostSchema),
    updatePostController,
  );

router.route("/:id").delete(authenticate,deletePostController)

export default router;
