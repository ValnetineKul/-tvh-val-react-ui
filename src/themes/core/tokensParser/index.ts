import logError from './helpers/logError';
import parseJson from './helpers/parseJson';
import writeFiles from './helpers/writeFiles';
import fetchJson from './services/fetchJson';

// to start use `yarn update-tokens --api-key 'api-key-value'`

const main = async () => {
  const apiKeyIndex = process.argv.indexOf('--api-key') + 1;
  if (!apiKeyIndex) {
    logError('You should pass API_KEY with `--api-key` flag!');
  }
  const apiKey = process.argv[apiKeyIndex];

  // eslint-disable-next-line no-console
  console.log('🧵  Loading JSON file...\n--------------------');

  const rawJson = await fetchJson(apiKey);

  const data = parseJson(rawJson);
  const isForce = process.argv.includes('-f') || process.argv.includes('--force');
  writeFiles(data, isForce);
};

main();
