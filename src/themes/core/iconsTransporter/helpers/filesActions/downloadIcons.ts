import type { IconInfo } from '../../types';
import { getFilePath } from '../namesFormatters/getFilePath';
import { downloadFile } from './downloadFile';

export const downloadIcons = (
  iconsLinks: Record<string, string | null>,
  iconsInfo: Map<string, IconInfo>,
  targetDirectory: string
) => {
  return Object.entries(iconsLinks).map(([iconId, link]) => {
    const icon = iconsInfo.get(iconId) as IconInfo;

    const { fileName } = icon;
    const filePath = getFilePath(fileName, targetDirectory);

    return downloadFile({
      filePath,
      link: link as string,
      isColoredIcon: icon.isColored,
    });
  });
};
