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
