export function loadConfig() {
  const config: TConfigApi = {
    urlBase: 'https://www.instagram.com'
  }

  global.config = config
}

loadConfig()
