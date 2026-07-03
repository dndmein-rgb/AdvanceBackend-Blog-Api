import express from "express";
import {
  currentUserController,
  loginUserController,
  logoutFromAllDevicesController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  loginUserSchema,
  logoutUserSchema,
  refreshtokenSchema,
  registerUserSchema,
} from "./auth.schema.js";
import { verifyUser } from "../../middleware/auth.middleware.js";
import { authService } from "./conatiner.js";

const router = express.Router();

router
  .route("/register")
  .post(validate(registerUserSchema), registerUserController);

router.route("/login").post(validate(loginUserSchema), loginUserController);

router
  .route("/refreshToken")
  .post(validate(refreshtokenSchema), refreshTokenController);

router
  .route("/me")
  .get(verifyUser(authService), currentUserController);

router
  .route("/logout")
  .post(verifyUser(authService), validate(logoutUserSchema), logoutUserController);

router
  .route("/logout-all-devices")
  .post(verifyUser(authService),logoutFromAllDevicesController)

export default router;
