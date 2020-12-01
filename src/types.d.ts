export type TProfile = {
  image: {
    standard: string;
    hd: string;
  };
  publications: number;
  followers: number;
  followed: number;
  name: string;
  biography: string;
  externalUrl: string;
  isBusiness: boolean;
  isVerified: boolean;
  isPrivate: boolean;
};

export type TPublications = {
  total: number;
  latestPosts: Array<TPost>;
};

export type TPost = {
  cover: {
    image: {
      standard: string;
      small: string;
    };
    video?: string;
  };
  media?: Array<TMedia>;
  content?: string;
  likes: number;
  comments: number;
  location?: string;
  date: string;
};

type TMedia = {
  type: 'image' | 'video';
  url: string;
  views?: number;
};
