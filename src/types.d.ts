export type TProfile = {
  image: {
    standard: string;
    hd: string;
  };
  publications: number;
  followers: number;
  followed: number;
  posts: number;
  name: string;
  biography: string;
  externalUrl: string;
  isBusiness: boolean;
  isVerified: boolean;
  isPrivate: boolean;
};

export type TLastPosts = Array<{
  code: string;
  cover: {
    image: string;
    video?: string;
  };
  media?: Array<TMedia>;
  content?: string;
  likes: number;
  comments: number;
  location?: string;
  date: string;
}>;

export type TMedia = {
  type: 'image' | 'video';
  url: string;
  views?: number;
};
