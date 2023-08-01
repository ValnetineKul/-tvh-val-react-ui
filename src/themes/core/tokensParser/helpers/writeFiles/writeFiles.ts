/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'fs';
import type { Data, DataFields } from '../../types';
import getPath from './getPath';

const writeFiles = (data: Data, isForce: boolean) => {
  let hasNotApplied = false;
  let hasIncongruity = false;

  Object.keys(data).forEach((key: keyof Data) => {
    // TODO add a darkmode theme!
    if (key === 'darkmode') {
      return;
    }

    const theme = data[key];
    if (!theme) return;

    Object.keys(theme).forEach(async (dataFieldKey: keyof DataFields) => {
      const value = theme[dataFieldKey];
      if (!value) {
        return;
      }
      const targetPath = path.resolve(__dirname, getPath(key, dataFieldKey));

      if (fs.existsSync(targetPath)) {
        const existedFile = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

        Object.keys(existedFile).forEach((oldToken) => {
          if (!(oldToken in value)) {
            console.log(
              `💥  Removed an old token "${oldToken}"\n🗿  with value "${existedFile[oldToken]}" from the file\n📄  ${targetPath}\n`,
              '--------------------'
            );

            hasIncongruity = true;
          }
        });

        Object.keys(value).forEach((newToken) => {
          if (!(newToken in existedFile)) {
            console.log(
              `🍀  Added a new token "${newToken}"\n🗿  with value "${value[newToken]}" to the file\n📄  ${targetPath}\n`,
              '--------------------'
            );

            hasIncongruity = true;
          }
        });
      }

      if (!hasIncongruity || isForce) {
        return fs.writeFileSync(path.resolve(__dirname, targetPath), `${JSON.stringify(value, undefined, 2)}\n`);
      }
      hasNotApplied = true;
    });
  });

  if (hasNotApplied) {
    console.log('❌  Changes were not applied because of the tokens incongruity');
    console.log('💪  If you still want to apply changes use -f or --force flag');
  }
};

export default writeFiles;
