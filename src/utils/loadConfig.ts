export async function loadConfig() {
  if (process.env.NODE_ENV !== 'production') {
    // Loading environment variables from path .env
    const result = (await import('dotenv')).config({ path: '.env' });
    if (result.error) throw new Error(`ERROR-CONFIG -> ${result.error}`);
  }
  const ENV: NodeJS.ProcessEnv = process.env;

  const config: TConfig = {
    port: Number(ENV.PORT) || 3000
  };

  global.config = config;
  console.log('>> CONFIG OK');
}
