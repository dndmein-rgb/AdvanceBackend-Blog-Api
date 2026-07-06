import { Comment } from "@prisma/client";
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

  async getCommentById(id: string) {
    return await prisma.comment.findUnique({
      where: { id },
      include: {
        post:true
      },
    });
  }
  async deleteCommentById(id: string) {
    return await prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
