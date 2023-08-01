import * as https from 'https';
import { API_URL } from '../constants';

const getOptions = (apiKey: string) => ({
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': apiKey,
  },
});

const fetchJson = (apiKey: string): Promise<string> =>
  new Promise((res, rej) => {
    https.get(API_URL, getOptions(apiKey), (response) => {
      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', (chunk) => {
        try {
          rawData += chunk;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err.message);
          rej(err);
        }
      });

      response.on('end', () => {
        try {
          res(rawData);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err.message);
          rej(err);
        }
      });
    });
  });

export default fetchJson;
