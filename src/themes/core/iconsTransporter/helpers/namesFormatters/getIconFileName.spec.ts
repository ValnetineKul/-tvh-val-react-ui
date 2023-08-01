import { getIconFileName } from './getIconFileName';

describe('getIconFileName', () => {
  it('Should work correctly', () => {
    expect(getIconFileName('camelCase')).toBe('camelCase');
    expect(getIconFileName('kebab-case')).toBe('kebabCase');
    expect(getIconFileName('snake_case')).toBe('snakeCase');
    expect(getIconFileName('PascalCase')).toBe('pascalCase');
    expect(getIconFileName('with/slashes')).toBe('withSlashes');
  });
});
