import { AppError } from "../../utils/AppError.js";
import { authRepository } from "./auth.repository.js";
import { registerUserDTO } from "./auth.schema.js";

export const registerUserService=async(body:registerUserDTO)=>{
    const {username,email,password}=body;

    const existingUserByUsername=await authRepository.findUserByUsername(username);
    if(existingUserByUsername){
        throw new AppError("User already exists",400)
    }
}