import { Comment } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { CommentWithPost, ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentRepository implements ICommentRepository {
  async createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment> {
    const newComment = await prisma.comment.create({
      data: {
        postId,
        userId,
        comment: data.comment,
      },
    });
    return newComment;
  }

  async getCommentById(id: string): Promise<CommentWithPost | null> {
    return await prisma.comment.findUnique({
      where: { id },
      include: {
        post: true,
      }, 
    });
  }

  async getCommentsByPostId(
    postId: string,
    limit: number = 10,
    cursor?: string,
  ): Promise<Comment[]> {
    return await prisma.comment.findMany({
      where: {
        postId,
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async deleteCommentById(id: string): Promise<Comment> {
    return await prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
