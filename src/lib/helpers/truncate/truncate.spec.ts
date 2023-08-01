import truncate from './truncate';

describe('truncate', () => {
  it('Should cut labels if max chracters length is more than character length', () => {
    const label = 'Extra long label which is not recommended';
    const characterLength = 30;
    const trancatedString = truncate(label, characterLength);
    expect(trancatedString).toHaveLength(30);
    expect(trancatedString).toEqual('Extra long label which is not…');
  });
});
