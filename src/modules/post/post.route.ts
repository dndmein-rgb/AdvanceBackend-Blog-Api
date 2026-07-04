import express from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { authService } from "../auth/auth.container.js";
import { verifyUser } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { createPostController } from "./post.controller.js";

const router = express.Router();

router
  .route("/create")
  .post(
    verifyUser(authService),
    upload.single("media"),
    validate(createPostSchema),
    createPostController
  );

  export default router
