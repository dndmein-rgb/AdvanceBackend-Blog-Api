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
import { authService } from "./auth.container.js";

const router = express.Router();

export const authenticate = verifyUser(authService);

router
  .route("/register")
  .post(validate(registerUserSchema), registerUserController);

router.route("/login").post(validate(loginUserSchema), loginUserController);

router
  .route("/refresh-token")
  .post(validate(refreshtokenSchema), refreshTokenController);

router.route("/me").get(authenticate, currentUserController);

router
  .route("/logout")
  .post(
    authenticate,
    validate(logoutUserSchema),
    logoutUserController,
  );

router
  .route("/logout-all-devices")
  .post(authenticate, logoutFromAllDevicesController);

export default router;
