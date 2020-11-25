export type TConfig = {
  urlBase: string;
};

export type TProfile = {
  profileImage: {
    standard: string;
    hd: string;
  };
  publications: string;
  followers: number;
  followed: number;
  name: string;
  biography: string;
};

/************************************ DECLARATIONS **************************************/

declare global {
  namespace NodeJS {
    interface Global {
      config: TConfig;
    }
  }
}
