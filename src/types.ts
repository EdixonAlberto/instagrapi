export type TProfile = {
  username: string;
  image: {
    standard: string;
    hd: string;
  };
  qtyPosts: number;
  followers: number;
  following: number;
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
  video: null | {
    url: string;
    views: number | null;
  };
  content: string | null;
  likes: number;
  qtyComments: number;
}>;

export type TPost = {
  postUrl: string;
  image: {
    standard: string;
    hd: string;
  };
  video: TVideo | null;
  content: string | null;
  likes: number;
  qtyComments: number;
  media: Array<TMedia>;
  author: {
    username: string;
    image: string;
    qtyPosts: number;
    followers: number;
    name: string;
    isVerified: boolean;
    isPrivate: boolean;
  };
  lastComments: Array<TComment>;
  location: null | {
    country: string | null;
    region: string | null;
    city: string | null;
    street: string | null;
    zipCode: string | null;
  };
  date: string;
};

export type TVideo = {
  url: string;
  type: string | 'clips' | 'igtv' | 'feed';
  views: number | null;
  duration: number;
  hasAudio:
    | boolean
    | {
        artist: string;
        song: string;
      };
};

export type TMedia = {
  image: {
    standard: string;
    hd: string;
  };
  video: TVideo | null;
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
  responses: Array<TComment>;
  isSpam: boolean;
  date: string;
};
