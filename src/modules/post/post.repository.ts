import { Post } from "@prisma/client";
import { IPostRepository } from "./post.interface.js";
import { prisma } from "../../lib/prisma.js";
import { updatePostDTO } from "./post.schema.js";
import { PostListItem } from "./post.types.js";

export class PostRepository implements IPostRepository {
  async createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<Post> {
    let createdPost;
    if (imageUrl) {
      createdPost = await prisma.post.create({
        data: {
          title,
          description,
          imageUrl,
          userId,
        },
      });
    } else {
      createdPost = await prisma.post.create({
        data: {
          title,
          description,
          userId,
        },
      });
    }
    return createdPost;
  }

  async getPostsByUserId(userId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }

  async getPostByPostId(postId: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async getAllPosts(cursor?: string ,limit: number = 5): Promise<PostListItem[]> {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        userId: true,
        updatedAt:true
      },
    });
    return posts;
  }

  async getPostByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<Post | null> {
    const post = await prisma.post.findFirst({
      where: {
        userId,
        id: postId,
      },
    });
    return post;
  }
  async updatePost(postId: string, data: updatePostDTO): Promise<Post> {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
      },
    });
    return updatedPost;
  }

  async deletePost(postId: string): Promise<Post> {
    return await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
