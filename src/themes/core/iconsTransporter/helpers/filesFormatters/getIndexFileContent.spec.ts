import { getIndexFileContent } from './getIndexFileContent';

describe('getIconImportString', () => {
  it('Should return a correct import string', () => {
    expect(getIndexFileContent(['quoteLeftSolid', 'starHalfSolid'])).toBe(
      // eslint-disable-next-line max-len
      "export { ReactComponent as QuoteLeftSolid } from './svg/quoteLeftSolid.svg';\nexport { ReactComponent as StarHalfSolid } from './svg/starHalfSolid.svg';\n"
    );
  });
});
