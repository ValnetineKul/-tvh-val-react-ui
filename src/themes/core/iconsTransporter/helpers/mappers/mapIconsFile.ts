/* eslint-disable no-console */
import type { GetFileNodesResult } from 'figma-api/lib/api-types';
import { figmaIconFileName, figmaIconsFileKey } from '../../constants';
import type { IconInfo } from '../../types';
import { getIconFileName } from '../namesFormatters/getIconFileName';
import { parseFigmaNodes } from './parseFigmaNodes';

interface Params {
  iconsFile: GetFileNodesResult;
  iconsRootNodeId: string;
  isColored?: boolean;
}

export const mapIconsFile = ({ iconsFile, iconsRootNodeId, isColored = false }: Params) => {
  const root = iconsFile.nodes?.[iconsRootNodeId]?.document;
  if (!root) {
    throw new Error('Incorrect icons file. Please check its node id!');
  }
  const iconsSets = parseFigmaNodes(root);

  return iconsSets.reduce<Map<string, IconInfo>>((acc, set) => {
    const setIcons = set.children;

    const currentIcon = setIcons.find((el) => el.name === 'size=24');

    if (!currentIcon) {
      console.log(
        `🧨  Incorrect format of icon https://www.figma.com/file/${figmaIconsFileKey}/${figmaIconFileName}?node-id=${set.id} (there should be icons with names "size=16", "size=24", and "size=80").`
      );
      console.log('--------------------');

      return acc;
    }

    // if name startsWith number - skip it
    if (!isNaN(Number(set.name[0]))) {
      console.log(
        `💣  Incorrect name "${set.name}" of icons set https://www.figma.com/file/${figmaIconsFileKey}/${figmaIconFileName}?node-id=${set.id} (names should not start with the numbers!).`
      );
      console.log('--------------------');
      return acc;
    }

    // if name startsWith underscore
    if (set.name.startsWith('_')) {
      console.log(
        `🗑️  Skipped icons set with name "${set.name}" https://www.figma.com/file/${figmaIconsFileKey}/${figmaIconFileName}?node-id=${set.id} (names that starts with "_" will be skipped!).`
      );
      console.log('--------------------');
      return acc;
    }

    acc.set(currentIcon.id, {
      fileName: getIconFileName(set.name),
      isColored,
    });

    return acc;
  }, new Map());
};
