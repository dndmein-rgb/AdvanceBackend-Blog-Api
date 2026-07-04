import { Post } from "@prisma/client";

export interface IPostRepository {
  createPost(
    title: string,
    description: string,
    userId:string,
    imageUrl?: string,
  ): Promise<Post>;
}
