type TConfig = {
  urlBase: string
}

// DECLARATIONS ________________________________________________________________________________________________________

declare namespace NodeJS {
  interface Global {
    config: TConfig
  }
}
