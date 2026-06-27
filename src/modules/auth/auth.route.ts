import express from "express";
import { registerUserController } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { registerUserSchema } from "./auth.schema.js";

const router = express();

router
  .route("/register")
  .post(validate(registerUserSchema), registerUserController);

export default router;
