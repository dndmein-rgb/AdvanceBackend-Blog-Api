import { Comment, Prisma } from "@prisma/client";
import { createCommentDTO } from "./comment.schema.js";

export type CommentWithPost = Prisma.CommentGetPayload<{
  include: {
    post: true;
  };
}>;

export interface ICommentRepository {
  createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment>;

  getCommentById(id: string): Promise<CommentWithPost | null>;

  getCommentsByPostId(
    postId: string,
    limit: number,
    cursor?: string,
  ): Promise<Comment[]>;

  deleteCommentById(id: string): Promise<Comment>;
}
