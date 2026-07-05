import { CommentRepository } from "./comment.repository.js";
import { CommentService } from "./comment.service.js";
import { PostRepository } from "../post/post.repository.js";

const commentRepository = new CommentRepository();
const postRepository = new PostRepository();

const commentService = new CommentService(
  commentRepository,
  postRepository
);

export { commentService };