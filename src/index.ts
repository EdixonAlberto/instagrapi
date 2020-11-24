import { loadConfig } from './utils/loadConfig';
import { endpoints } from '@ENUM';

async function main() {
  try {
    await loadConfig();

    console.log(endpoints.API);
  } catch (error) {
    console.error(error);
  }
}

main();
