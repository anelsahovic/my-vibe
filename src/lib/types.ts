export type EventSmallCardType = {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  price: number;
};

export type UserSmallCardType = {
  id: string;
  image: string | null;
  name: string | null;
  username: string;
  _count: {
    followers: number;
  };
};

export type UserDb = {
  id: string;
  kindeId: string;
  email: string;
  username: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Author = {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
};

export type Comment = {
  id: string;
  createdAt: Date;
  authorId: string;
  content: string;
  postId: string;
  author: Author;
};

export type Like = {
  id: string;
  userId: string;
  postId: string;
  user: Author;
};

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  content: string | null;
  image: string | null;
  author: Author;
  comments: Comment[];
  likes: Like[];
  _count: {
    likes: number;
    comments: number;
  };
};
