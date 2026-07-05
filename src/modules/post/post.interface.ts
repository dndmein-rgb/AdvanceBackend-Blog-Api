import { Post } from "@prisma/client";
import { updatePostDTO } from "./post.schema.js";

export interface IPostRepository {
  createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<Post>;

  getUserPostsById(userId: string): Promise<Post[]>;

  getAllPosts(): Promise<Post[]>;

  getPostByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<Post | null>;

  updatePost(postId: string, data: updatePostDTO): Promise<Post>;

  deletePost(postId: string): Promise<Post>;
}
