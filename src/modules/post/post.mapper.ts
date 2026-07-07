import { PostListResponse } from "./post.response.js";
import { PostListItem } from "./post.types.js";

export const toPostListResponse = (posts: PostListItem[]):PostListResponse[] => {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    userId: post.userId,
  }));
};