import { IUserResponse } from "../../types/index.js";
import { UserResponseDTO } from "./auth.response.js";

export const toUserResponse = (user: IUserResponse):UserResponseDTO => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
