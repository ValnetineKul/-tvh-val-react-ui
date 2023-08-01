/* eslint-disable no-console */
import { Api } from 'figma-api';
import * as fs from 'fs';
import { getExistedIcons } from '../helpers/cacheHelpers/getExistedIcons';
import { downloadIcons } from '../helpers/filesActions/downloadIcons';
import { updateIndexFile } from '../helpers/filesFormatters/updateIndexFile';
import { mapIconsFile } from '../helpers/mappers/mapIconsFile';
import { figmaIconsFileKey, personalAccessToken } from '../constants';

type IconsKitName = 'functional' | 'country' | 'product category' | 'machinery' | 'commercial' | 'brand';

interface Params {
  iconsPath: string;
  iconsRootNodeId: string;
  iconsKitName: IconsKitName;
  fileKey?: string;
  isColored?: boolean;
  isFullUpdate?: boolean;
  isForceUpdate?: boolean;
}

const emoji: Record<IconsKitName, string> = {
  functional: '🛎️',
  country: '🐻',
  'product category': '🔩',
  machinery: '🚜',
  commercial: '💰',
  brand: '🏴',
};

export const fetchIcons = async ({
  iconsPath,
  iconsKitName,
  iconsRootNodeId,
  fileKey = figmaIconsFileKey,
  isColored,
  isFullUpdate = false,
  isForceUpdate = false,
}: Params) => {
  try {
    // figma api
    const api = new Api({ personalAccessToken });

    console.log(`${emoji[iconsKitName]}  The ${iconsKitName} icons tree is loading`);
    console.log('--------------------');
    const iconsFile = await api.getFileNodes(fileKey, [iconsRootNodeId]);

    const iconsSvgPath = `${iconsPath}/svg`;

    if (!isForceUpdate && !fs.existsSync(iconsSvgPath)) {
      fs.mkdirSync(iconsSvgPath, { recursive: true });
    }

    const existedIcons = getExistedIcons(iconsSvgPath);
    const iconsInfo = mapIconsFile({ iconsFile, iconsRootNodeId, isColored });

    existedIcons.forEach((fileName) => {
      if (!Array.from(iconsInfo.values()).find((iconInfo) => iconInfo.fileName === fileName)) {
        console.log(
          `🤬  Icon "${fileName}.svg" is exists in the monorepo but not exists in the Figma! Did you add it manually?!`
        );
        console.log('--------------------');
      }
    });

    if (!isFullUpdate && !isForceUpdate) {
      iconsInfo.forEach(({ fileName }, iconId) => {
        if (existedIcons.has(fileName)) {
          iconsInfo.delete(iconId);
        }
      });

      if (iconsInfo.size === 0) {
        console.log(`🌴  No new ${iconsKitName} icons in figma. Try to make a full update.`);
        console.log('--------------------');
        return;
      }
    }

    if (isForceUpdate) {
      fs.rmSync(iconsSvgPath, { recursive: true, force: true });
      fs.mkdirSync(iconsSvgPath);
    }

    console.log(`🐌  Getting the images links of the ${iconsKitName} icons...`);
    console.log('--------------------');
    const { images } = await api.getImage(fileKey, {
      ids: Array.from(iconsInfo.keys()).join(','),
      format: 'svg',
      scale: 1,
    });

    const downloadingPromises = downloadIcons(images, iconsInfo, iconsSvgPath);

    console.log(`🚀  Downloading the SVG ${iconsKitName} icons...`);
    console.log('--------------------');

    await Promise.all(downloadingPromises);
    updateIndexFile(iconsPath, iconsSvgPath);

    console.log(`🎉  The ${iconsKitName} icons were successfully updated!`);
    console.log('>>>>>>>>>>>>>>>>>>>>DONE<<<<<<<<<<<<<<<<<<<<');

    return;
  } catch (err) {
    console.log(err);
  }
};
