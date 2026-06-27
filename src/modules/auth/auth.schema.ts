import { z } from "zod";

export const registerUserSchema = 
   z.object({
    username: z.string().min(3, "Username must be 3 characters long."),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })


export type registerUserDTO = z.infer<typeof registerUserSchema>;
