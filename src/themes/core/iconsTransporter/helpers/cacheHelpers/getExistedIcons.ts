import * as fs from 'fs';

export const getExistedIcons = (iconsContainerPath: string, iconExtension = '.svg') => {
  const currentDirContent = fs.readdirSync(iconsContainerPath, {
    withFileTypes: true,
  });

  return currentDirContent.reduce<Set<string>>((acc, item) => {
    if (item.isFile() && item.name.endsWith(iconExtension)) {
      return acc.add(item.name.split(iconExtension)[0]);
    }

    return acc;
  }, new Set());
};
