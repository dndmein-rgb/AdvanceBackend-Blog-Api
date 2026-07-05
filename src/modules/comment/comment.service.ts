import { AppError } from "../../utils/AppError.js";
import { IPostRepository } from "../post/post.interface.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentService {
  constructor(
    private readonly commentRepo: ICommentRepository,
    private readonly postRepo: IPostRepository,
  ) {}

  async createComment(postId: string, userId: string, data: createCommentDTO) {
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
}
