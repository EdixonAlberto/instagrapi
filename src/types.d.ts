export type TProfile = {
  profileImage: {
    standard: string;
    hd: string;
  };
  publications: number;
  followers: number;
  followed: number;
  name: string;
  biography: string;
};

export type TPublications = {
  total: number;
  publications: Array<TPublication>;
};

export type TPublication = {
  coverImage: {
    standard: string;
    small: string;
  };
  media?: Array<TMedia>;
  content?: string;
  likes: number;
  comments: number;
  date: string;
};

export type TMedia = {
  image: string;
  video?: {
    url: string;
    views: number;
    title?: string;
    duration?: number;
  };
};
