import { TConfig } from '../types';

export function loadConfig() {
  const config: TConfig = {
    urlBase: 'https://www.instagram.com'
  };

  global.config = config;
}
