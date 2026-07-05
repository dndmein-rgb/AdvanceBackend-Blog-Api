import { Post } from "@prisma/client";
import { IPostRepository } from "./post.interface.js";
import { prisma } from "../../lib/prisma.js";
import { updatePostDTO } from "./post.schema.js";

export class PostRepository implements IPostRepository {
  async createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ) {
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

  async getUserPostsById(userId: string) {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }

  async getAllPosts(){
    const posts=await prisma.post.findMany()
    return posts;
  }

  async getPostByPostIdAndUserId(postId: string, userId: string) {
    const post = await prisma.post.findFirst({
      where: {
        userId,
        id: postId,
      },
    });
    return post;
  }
  async updatePost(postId: string, data: updatePostDTO) {
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

  async deletePost(postId: string) {
    return await prisma.post.delete({
      where:{
        id:postId
      }
    })
  }
}
