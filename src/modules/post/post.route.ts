import express from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import { authService } from "../auth/auth.container.js";
import { verifyUser } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getUserPostController,
  updatePostController,
} from "./post.controller.js";

const router = express.Router();

router.route("/").get(getAllPostsController);

router
  .route("/create")
  .post(
    verifyUser(authService),
    upload.single("media"),
    validate(createPostSchema),
    createPostController,
  );

router.route("/your-posts").get(verifyUser(authService), getUserPostController);
router
  .route("/:id")
  .patch(
    verifyUser(authService),
    validate(updatePostSchema),
    updatePostController,
  );

router.route("/:id").delete(verifyUser(authService),deletePostController)

export default router;
