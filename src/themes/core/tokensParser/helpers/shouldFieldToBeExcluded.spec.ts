import shouldFieldToBeExcluded from './shouldFieldToBeExcluded';

jest.mock('../constants', () => {
  const originalModule = jest.requireActual('../constants');

  return {
    __esModule: true,
    ...originalModule,
    fieldsToExclude: ['_color'],
    typesToExclude: ['letterSpacing'],
  };
});

describe('shouldFieldToBeExcluded', () => {
  it('Should exclude by fieldName', () => {
    expect(shouldFieldToBeExcluded('_color', 'value')).toBe(true);
  });

  it('Should exclude by type', () => {
    expect(shouldFieldToBeExcluded('field', { value: 'value', type: 'letterSpacing' })).toBe(true);
  });

  it('Should exclude by value', () => {
    expect(shouldFieldToBeExcluded('field', 'value')).toBe(true);
  });

  it('Should not exclude if all params is ok', () => {
    expect(shouldFieldToBeExcluded('field', { value: 'value', type: 'type' })).toBe(false);
  });
});
