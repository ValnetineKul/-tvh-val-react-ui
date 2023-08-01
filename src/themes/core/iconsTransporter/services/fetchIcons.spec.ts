import type { GetFileNodesResult } from 'figma-api/lib/api-types';
import { figmaIconsFileKey } from '../constants';
import { fetchIcons } from './fetchIcons';

// with mockImplementation no message will be printed to the console
const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});

const mockIconFile: GetFileNodesResult = {
  name: 'iconsFile',
  lastModified: 'today',
  thumbnailUrl: 'someUrl',
  version: '1',
  nodes: {},
};
const mockFigmaApiGetFileNodes = jest.fn().mockReturnValue(mockIconFile);
const mockFigmaApiGetImage = jest
  .fn()
  .mockReturnValue({ images: { '1307:709': 'image-link1', '1307:701': 'image-link2' } });
jest.mock('figma-api', () => ({
  Api: class {
    getFileNodes = mockFigmaApiGetFileNodes;

    getImage = mockFigmaApiGetImage;
  },
}));

const mockExistsSync = jest.fn();
const mockMkdirSync = jest.fn();
const mockRmSync = jest.fn();
jest.mock('fs', () => ({
  existsSync: (arg: string) => mockExistsSync(arg),
  mkdirSync: (arg: string) => mockMkdirSync(arg),
  rmSync: (arg: string) => mockRmSync(arg),
}));

const mockGetExistedIcons = jest.fn().mockReturnValue(new Set(['iconName1', 'iconName2', 'iconName3']));
jest.mock('../helpers/cacheHelpers/getExistedIcons.ts', () => {
  return {
    __esModule: true,
    getExistedIcons: () => mockGetExistedIcons(),
  };
});

const mockMapIconsFile = jest.fn().mockReturnValue(
  new Map(
    Object.entries({
      '1307:709': { fileName: 'iconName1', isColored: false },
      '1307:701': { fileName: 'iconName2', isColored: false },
      '1307:705': { fileName: 'iconName3', isColored: false },
      '1307:702': { fileName: 'iconName4', isColored: false },
    })
  )
);
jest.mock('../helpers/mappers/mapIconsFile.ts', () => {
  return {
    __esModule: true,
    mapIconsFile: (arg: { iconsFile: GetFileNodesResult; iconsRootNodeId: string; isColored?: boolean }) =>
      mockMapIconsFile(arg),
  };
});

const mockDownloadIcons = jest.fn().mockReturnValue([Promise.resolve(), Promise.resolve()]);
jest.mock('../helpers/filesActions/downloadIcons.ts', () => {
  return {
    __esModule: true,
    downloadIcons: (images: Record<string, string | null>, iconsInfo: Map<string, string>, iconsSvgPath: string) =>
      mockDownloadIcons(images, iconsInfo, iconsSvgPath),
  };
});

const mockUpdateIndexFile = jest.fn();
jest.mock('../helpers/filesFormatters/updateIndexFile.ts', () => {
  return {
    __esModule: true,
    updateIndexFile: (iconsPath: string, iconsSvgPath: string) => mockUpdateIndexFile(iconsPath, iconsSvgPath),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchIcons', () => {
  it('Should work well without full update', async () => {
    mockExistsSync.mockReturnValue(false);

    await fetchIcons({
      fileKey: figmaIconsFileKey,
      iconsPath: 'path',
      iconsKitName: 'country',
      iconsRootNodeId: 'root-node-id',
      isColored: false,
      isFullUpdate: false,
      isForceUpdate: false,
    });

    expect(mockFigmaApiGetFileNodes).toBeCalledTimes(1);
    expect(mockFigmaApiGetFileNodes).toHaveBeenCalledWith(figmaIconsFileKey, ['root-node-id']);

    expect(mockExistsSync).toBeCalledTimes(1);
    expect(mockExistsSync).toHaveBeenCalledWith('path/svg');
    expect(mockMkdirSync).toBeCalledTimes(1);
    expect(mockMkdirSync).toHaveBeenCalledWith('path/svg');
    expect(mockLog).not.toHaveBeenNthCalledWith(
      3,
      '🤬  Icon "iconName.svg" is exists in the monorepo but not exists in the Figma! Did you add it manually?!'
    );

    expect(mockMapIconsFile).toBeCalledTimes(1);
    expect(mockMapIconsFile).toHaveBeenCalledWith({
      iconsFile: mockIconFile,
      iconsRootNodeId: 'root-node-id',
      isColored: false,
    });

    expect(mockRmSync).not.toBeCalled();

    expect(mockFigmaApiGetImage).toBeCalledTimes(1);
    expect(mockFigmaApiGetImage).toHaveBeenCalledWith('IFUdLmwKPIGvkqY0Dy8HY3', {
      format: 'svg',
      ids: '1307:702',
      scale: 1,
    });

    expect(mockDownloadIcons).toBeCalledTimes(1);
    expect(mockDownloadIcons).toHaveBeenCalledWith(
      { '1307:709': 'image-link1', '1307:701': 'image-link2' },
      new Map([['1307:702', { fileName: 'iconName4', isColored: false }]]),
      'path/svg'
    );

    expect(mockUpdateIndexFile).toBeCalledTimes(1);
    expect(mockUpdateIndexFile).toHaveBeenCalledWith('path', 'path/svg');
  });

  it('Should work well if no new icons in Figma', async () => {
    mockGetExistedIcons.mockReturnValue(new Set(['exoticIcon', 'iconName1', 'iconName2', 'iconName3', 'iconName4']));
    mockMapIconsFile.mockReturnValue(
      new Map(
        Object.entries({
          '1307:709': { fileName: 'iconName1', isColored: false },
          '1307:701': { fileName: 'iconName2', isColored: false },
          '1307:705': { fileName: 'iconName3', isColored: false },
          '1307:702': { fileName: 'iconName4', isColored: false },
        })
      )
    );

    await fetchIcons({
      fileKey: figmaIconsFileKey,
      iconsPath: 'path',
      iconsKitName: 'country',
      iconsRootNodeId: 'root-node-id',
      isColored: true,
      isFullUpdate: false,
      isForceUpdate: false,
    });

    expect(mockLog).toHaveBeenNthCalledWith(
      3,
      '🤬  Icon "exoticIcon.svg" is exists in the monorepo but not exists in the Figma! Did you add it manually?!'
    );

    expect(mockMapIconsFile).toBeCalledTimes(1);
    expect(mockMapIconsFile).toHaveBeenCalledWith({
      iconsFile: mockIconFile,
      iconsRootNodeId: 'root-node-id',
      isColored: true,
    });

    expect(mockLog).toHaveBeenNthCalledWith(5, '🌴  No new country icons in figma. Try to make a full update.');
    expect(mockRmSync).not.toBeCalled();
    expect(mockFigmaApiGetImage).not.toBeCalled();
    expect(mockDownloadIcons).not.toBeCalled();
    expect(mockUpdateIndexFile).not.toBeCalled();
  });

  it('Should work well with the full update if no new icons in Figma', async () => {
    mockExistsSync.mockReturnValue(true);
    mockGetExistedIcons.mockReturnValue(new Set(['exoticIcon', 'iconName1', 'iconName2', 'iconName3', 'iconName4']));
    mockMapIconsFile.mockReturnValue(
      new Map(
        Object.entries({
          '1307:709': { fileName: 'iconName1', isColored: false },
          '1307:701': { fileName: 'iconName2', isColored: false },
          '1307:705': { fileName: 'iconName3', isColored: false },
          '1307:702': { fileName: 'iconName4', isColored: false },
        })
      )
    );
    mockFigmaApiGetImage.mockReturnValue({
      images: {
        '1307:709': 'image-link1',
        '1307:701': 'image-link2',
        '1307:705': 'image-link3',
        '1307:702': 'image-link4',
      },
    });

    await fetchIcons({
      fileKey: figmaIconsFileKey,
      iconsPath: 'path',
      iconsKitName: 'country',
      iconsRootNodeId: 'root-node-id',
      isColored: true,
      isFullUpdate: true,
      isForceUpdate: false,
    });

    expect(mockFigmaApiGetFileNodes).toBeCalledTimes(1);
    expect(mockFigmaApiGetFileNodes).toHaveBeenCalledWith(figmaIconsFileKey, ['root-node-id']);

    expect(mockExistsSync).toBeCalledTimes(1);
    expect(mockExistsSync).toHaveBeenCalledWith('path/svg');
    expect(mockMkdirSync).not.toBeCalled();

    expect(mockMapIconsFile).toBeCalledTimes(1);
    expect(mockMapIconsFile).toHaveBeenCalledWith({
      iconsFile: mockIconFile,
      iconsRootNodeId: 'root-node-id',
      isColored: true,
    });

    expect(mockRmSync).not.toBeCalled();

    expect(mockFigmaApiGetImage).toBeCalledTimes(1);
    expect(mockFigmaApiGetImage).toHaveBeenCalledWith('IFUdLmwKPIGvkqY0Dy8HY3', {
      format: 'svg',
      ids: '1307:709,1307:701,1307:705,1307:702',
      scale: 1,
    });

    expect(mockDownloadIcons).toBeCalledTimes(1);
    expect(mockDownloadIcons).toHaveBeenCalledWith(
      { '1307:701': 'image-link2', '1307:702': 'image-link4', '1307:705': 'image-link3', '1307:709': 'image-link1' },
      new Map([
        ['1307:701', { fileName: 'iconName2', isColored: false }],
        ['1307:702', { fileName: 'iconName4', isColored: false }],
        ['1307:705', { fileName: 'iconName3', isColored: false }],
        ['1307:709', { fileName: 'iconName1', isColored: false }],
      ]),
      'path/svg'
    );

    expect(mockUpdateIndexFile).toBeCalledTimes(1);
    expect(mockUpdateIndexFile).toHaveBeenCalledWith('path', 'path/svg');
  });

  it('Should work well with the force update if no new icons in Figma', async () => {
    mockExistsSync.mockReturnValue(false);
    mockGetExistedIcons.mockReturnValue(new Set(['exoticIcon', 'iconName1', 'iconName2', 'iconName3', 'iconName4']));
    mockMapIconsFile.mockReturnValue(
      new Map(
        Object.entries({
          '1307:709': { fileName: 'iconName1', isColored: false },
          '1307:701': { fileName: 'iconName2', isColored: false },
          '1307:705': { fileName: 'iconName3', isColored: false },
          '1307:702': { fileName: 'iconName4', isColored: false },
        })
      )
    );
    mockFigmaApiGetImage.mockReturnValue({ images: ['image-link1', 'image-link2', 'image-link3', 'image-link4'] });

    await fetchIcons({
      fileKey: figmaIconsFileKey,
      iconsPath: 'path',
      iconsKitName: 'country',
      iconsRootNodeId: 'root-node-id',
      isColored: false,
      isFullUpdate: false,
      isForceUpdate: true,
    });

    expect(mockFigmaApiGetFileNodes).toBeCalledTimes(1);
    expect(mockFigmaApiGetFileNodes).toHaveBeenCalledWith(figmaIconsFileKey, ['root-node-id']);

    expect(mockExistsSync).not.toBeCalled();
    expect(mockMkdirSync).toBeCalledTimes(1);
    expect(mockMkdirSync).toHaveBeenCalledWith('path/svg');

    expect(mockMapIconsFile).toBeCalledTimes(1);
    expect(mockMapIconsFile).toHaveBeenCalledWith({
      iconsFile: mockIconFile,
      iconsRootNodeId: 'root-node-id',
      isColored: false,
    });

    expect(mockRmSync).toBeCalledTimes(1);
    expect(mockRmSync).toHaveBeenCalledWith('path/svg');

    expect(mockFigmaApiGetImage).toBeCalledTimes(1);
    expect(mockFigmaApiGetImage).toHaveBeenCalledWith('IFUdLmwKPIGvkqY0Dy8HY3', {
      format: 'svg',
      ids: '1307:709,1307:701,1307:705,1307:702',
      scale: 1,
    });

    expect(mockDownloadIcons).toBeCalledTimes(1);
    expect(mockDownloadIcons).toHaveBeenCalledWith(
      ['image-link1', 'image-link2', 'image-link3', 'image-link4'],
      new Map([
        ['1307:701', { fileName: 'iconName2', isColored: false }],
        ['1307:702', { fileName: 'iconName4', isColored: false }],
        ['1307:705', { fileName: 'iconName3', isColored: false }],
        ['1307:709', { fileName: 'iconName1', isColored: false }],
      ]),
      'path/svg'
    );

    expect(mockUpdateIndexFile).toBeCalledTimes(1);
    expect(mockUpdateIndexFile).toHaveBeenCalledWith('path', 'path/svg');
  });
});
