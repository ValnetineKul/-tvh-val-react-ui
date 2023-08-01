import type { GetFileNodesResult } from 'figma-api/lib/api-types';
import { mockFigmaData } from './__mocks__/figmaData';
import { mapIconsFile } from './mapIconsFile';

const mockParseFigmaNodes = jest.fn((arg) => jest.requireActual('./parseFigmaNodes.ts').parseFigmaNodes(arg));
jest.mock('./parseFigmaNodes.ts', () => {
  return {
    __esModule: true,
    parseFigmaNodes: (arg: Node) => mockParseFigmaNodes(arg),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

const mockIconsFile = { nodes: { 'node-Id': { document: mockFigmaData } } } as unknown as GetFileNodesResult;

describe('mapIconsFile', () => {
  it('Should return correct value', () => {
    expect(mapIconsFile({ iconsFile: mockIconsFile, iconsRootNodeId: 'node-Id' })).toEqual(
      new Map(
        Object.entries({
          '1307:709': { fileName: 'quoteLeftSolid', isColored: false },
          '1307:701': { fileName: 'starSolid', isColored: false },
          '1307:705': { fileName: 'starHalfSolid', isColored: false },
        })
      )
    );
    expect(mapIconsFile({ iconsFile: mockIconsFile, iconsRootNodeId: 'node-Id', isColored: true })).toEqual(
      new Map(
        Object.entries({
          '1307:709': { fileName: 'quoteLeftSolid', isColored: true },
          '1307:701': { fileName: 'starSolid', isColored: true },
          '1307:705': { fileName: 'starHalfSolid', isColored: true },
        })
      )
    );
  });

  it('Should call parseFigmaNodes function with correct parameters', () => {
    mapIconsFile({ iconsFile: mockIconsFile, iconsRootNodeId: 'node-Id' });
    expect(mockParseFigmaNodes).toBeCalledTimes(1);
    expect(mockParseFigmaNodes).toHaveBeenCalledWith(mockFigmaData);
  });
});
