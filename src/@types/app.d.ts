type TConfigApi = {
  devMode: boolean
  urlBase: string
}

type TResponseApi = {
  graphql: TInstagramApi['graphql'] | TPostApi['graphql']
}
