import * as fs from 'fs';
import { getIndexFileContent } from './getIndexFileContent';
import { getExistedIcons } from '../cacheHelpers/getExistedIcons';

export const updateIndexFile = (indexFilePath: string, iconsDirPath: string) => {
  const existedIcons = getExistedIcons(iconsDirPath);
  const fileContent = getIndexFileContent(Array.from(existedIcons.values()));

  const indexFile = fs.openSync(`${indexFilePath}/index.ts`, 'w');
  fs.writeSync(indexFile, fileContent);
};
