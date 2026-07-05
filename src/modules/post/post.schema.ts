import { z } from "zod";

export const createPostSchema = z
  .object({
    title: z.string().min(1, "Post title cannot be empty"),
    description: z
      .string()
      .min(10, "Post description must be atleast 10 characters long"),
    imageUrl: z.string().optional(),
  })
  .strict();

export const updatePostSchema = z
  .object({
    title: z.string().min(1, "Post title cannot be empty").optional(),
    description: z
      .string()
      .min(10, "Post description must be atleast 10 characters long").optional(),
    imageUrl: z.string().optional(),
  })
  .strict();

export type createPostDTO = z.infer<typeof createPostSchema>;
export type updatePostDTO = z.infer<typeof updatePostSchema>;
