import { Post } from "@prisma/client";
import { updatePostDTO } from "./post.schema.js";

export interface IPostRepository {
  createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<Post>;

  getPostsByUserId(userId: string): Promise<Post[]>;
  getPostByPostId(postId: string): Promise<Post | null>;

  getAllPosts(cursor?:string, limit?:number): Promise<Post[]>;

  getPostByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<Post | null>;

  updatePost(postId: string, data: updatePostDTO): Promise<Post>;

  deletePost(postId: string): Promise<Post>;
}
