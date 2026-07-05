import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentRepository implements ICommentRepository {
  async createComment(postId: string, userId: string, data: createCommentDTO) {
    const newComment = await prisma.comment.create({
      data: {
        postId,
        userId,
        comment: data.comment,
      },
    });
    return newComment;
  }
}
