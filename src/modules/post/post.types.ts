import { Prisma } from "@prisma/client";

export type PostListItem = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    imageUrl: true;
    createdAt: true;
    updatedAt: true;
    userId: true;
  };
}>;
