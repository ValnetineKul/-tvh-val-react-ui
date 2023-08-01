import type { Node } from 'figma-api';
import { parseFigmaNodes } from './parseFigmaNodes';
import { mockFigmaData } from './__mocks__/figmaData';

describe('parseFigmaNodes', () => {
  it('Should work well with real data', () => {
    const testRoot = mockFigmaData as unknown as Node<'CANVAS'>;
    expect(parseFigmaNodes(testRoot).map((el) => el.id)).toEqual(['1307:711', '1307:703', '1307:707']);
  });
});
