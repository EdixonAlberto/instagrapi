type TConfigApi = {
  urlBase: string
}

// DECLARATIONS ________________________________________________________________________________________________________

declare namespace NodeJS {
  interface Global {
    config: TConfigApi
  }
}
