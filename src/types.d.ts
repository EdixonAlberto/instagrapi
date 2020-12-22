export type TProfile = {
  username: string;
  image: {
    standard: string;
    hd: string;
  };
  followers: number;
  followed: number;
  qtyPosts: number;
  name: string;
  biography: string;
  externalUrl: string;
  isBusiness: boolean;
  isVerified: boolean;
  isPrivate: boolean;
};

export type TLastPosts = Array<{
  postUrl: string;
  image: string;
  video?: string;
  content: string;
  likes: number;
  qtyComments: number;
}>;

export type TPost = {
  postUrl: string;
  content: string;
  likes: number;
  qtyComments: number;
  media?: Array<TMedia>;
  author: {
    username: string;
    image: string;
    followed: number;
    qtyPosts: number;
    name: string;
    isVerified: boolean;
    isPrivate: boolean;
  };
  lastComments: Array<TComment>;
};

export type TMedia = {
  image: {
    standard: string;
    hd: string;
  };
  video?: {
    url: string;
    isAudio: boolean;
    views: number;
  };
  taggedUsers: Array<TTagged>;
};

export type TTagged = {
  image: string;
  name: string;
  isVerified: boolean;
  coordinates: {
    x: number;
    y: number;
  };
};

export type TComment = {
  content: string;
  author: {
    username: string;
    image: string;
    isVerified: boolean;
  };
  likes: number;
  responses?: Array<TComment>;
  isSpam: boolean;
  date: string;
};
