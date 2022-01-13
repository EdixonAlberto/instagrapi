const ENV = process.env.NODE_ENV || 'development'

export const configApi: TConfigApi = {
  devMode: ENV === 'development',
  urlBase: 'https://www.instagram.com'
}
