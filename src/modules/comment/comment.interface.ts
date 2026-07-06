import { Comment } from "@prisma/client";
import { createCommentDTO } from "./comment.schema.js";

export interface ICommentRepository {
  createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment>;

  getCommentById(id: string): Promise<any>;

  deleteCommentById(id: string): Promise<Comment>;
}
