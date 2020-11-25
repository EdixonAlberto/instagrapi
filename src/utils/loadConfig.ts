import { TConfig } from '@types';

export async function loadConfig() {
  const config: TConfig = {
    urlBase: 'https://www.instagram.com'
  };

  global.config = config;
  console.log('>> CONFIG OK');
}
