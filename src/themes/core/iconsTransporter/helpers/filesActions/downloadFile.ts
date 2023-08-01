/* eslint-disable no-console */
import * as fs from 'fs';
import * as https from 'https';
import { convertSvgToDynamicFillSvg } from '../filesFormatters/convertSvgToDynamicFillSvg';

interface Params {
  filePath: string;
  link: string;
  isColoredIcon: boolean;
}

export const downloadFile = ({ filePath, link, isColoredIcon }: Params): Promise<string> => {
  return new Promise((resolve, reject) =>
    https.get(link, (response) => {
      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', (chunk) => {
        try {
          rawData += chunk;
        } catch (err) {
          reject(err);
        }
      });

      response.on('end', () => {
        try {
          const newIcon = convertSvgToDynamicFillSvg(rawData, isColoredIcon);
          fs.writeFileSync(filePath, newIcon);
          resolve(newIcon);
        } catch (err) {
          console.error(err.message);
          reject(err);
        }
      });
    })
  );
};
