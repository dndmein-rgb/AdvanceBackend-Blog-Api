import { Comment } from "@prisma/client";
import { AppError } from "../../utils/AppError.js";
import { IPostRepository } from "../post/post.interface.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentService {
  constructor(
    private readonly commentRepo: ICommentRepository,
    private readonly postRepo: IPostRepository,
  ) {}

  async createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment> {
    const post = await this.postRepo.getPostByPostId(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const newComment = await this.commentRepo.createComment(
      postId,
      userId,
      data,
    );
    return newComment;
  }

  async getCommentsByPostId(
    postId: string,
    limit: number,
    cursor?: string,
  ): Promise<Comment[]> {
    const comments = await this.commentRepo.getCommentsByPostId(
      postId,
      limit,
      cursor,
    );
    if (!comments) {
      throw new AppError("Comments not found", 404);
    }
    return comments;
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepo.getCommentById(commentId);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    if (comment.userId !== userId && comment.post.userId !== userId) {
      throw new AppError(
        "Forbidden: You are not allowed to delete this comment",
        403,
      );
    }
    await this.commentRepo.deleteCommentById(commentId);
  }
}
