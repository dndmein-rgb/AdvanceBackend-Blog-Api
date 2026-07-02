import express from "express";
import {
  currentUserController,
  loginUserController,
  refreshTokenController,
  registerUserController,
} from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  loginUserSchema,
  refreshtokenSchema,
  registerUserSchema,
} from "./auth.schema.js";
import { verifyUser } from "../../middleware/auth.middleware.js";

const router = express();

router
  .route("/register")
  .post(validate(registerUserSchema), registerUserController);

router
  .route("/login") 
  .post(validate(loginUserSchema), loginUserController);

router
  .route("/refreshToken")
  .post(validate(refreshtokenSchema), refreshTokenController);

router.route("/me").get(verifyUser,currentUserController)

export default router;
