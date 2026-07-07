import { Post } from "@prisma/client";
import { AppError } from "../../utils/AppError.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { createPostDTO, updatePostDTO } from "./post.schema.js";
import { IFileService } from "../../utils/file.interface.js";

export class PostService {
  constructor(private readonly repo: IPostRepository,
    private readonly fileService: IFileService
  ) {}

  async createPost(
    body: createPostDTO,
    userId: string,
    localFilePath?: string,
  ): Promise<Post> {
    const { title, description } = body;

    if (localFilePath) {
      const imageUrl = await this.fileService.upload(localFilePath);
      return await this.repo.createPost(title, description, userId, imageUrl);
    }
    return await this.repo.createPost(title, description, userId);
  }

  async getUserPosts(userId: string): Promise<Post[]> {
    const posts = await this.repo.getPostsByUserId(userId);
    return posts;
  }

  async getAllPosts(cursor?:string,limit?:number): Promise<Post[]> {
    const posts = await this.repo.getAllPosts(cursor,limit);
    return posts;
  }

  async updatePost(
    postId: string,
    userId: string,
    data: updatePostDTO,
  ): Promise<Post> {
    const post = await this.repo.getPostByPostIdAndUserId(postId, userId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    const updatedPost = await this.repo.updatePost(postId, data);
    return updatedPost;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.repo.getPostByPostIdAndUserId(postId, userId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    if (post.imageUrl) {
      await this.fileService.delete(post.imageUrl);
    }
    await this.repo.deletePost(postId);
  }
}
