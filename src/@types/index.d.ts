type TConfig = {
  port: number;
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
