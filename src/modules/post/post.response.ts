export type PostListResponse = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export interface PaginationMeta {
  nextCursor: string | null;
}

export interface GetPostsResponse {
  posts: PostListResponse[];
  meta: PaginationMeta;
}
