import type { RawFontDefinition } from '../../types';
import type { FontDefinition } from '../../../types/FontDefinition';
import get from '../get';
import logError from '../logError';
import type { TreeData } from '../parseJson';
import getResource from './getResource';
import mapFontFields from './mapFontFields';

const getPxString = (value: string | number) => (Number.isNaN(Number(value)) ? `${value}` : `${value}px`);

interface Params {
  token: string;
  value: RawFontDefinition;
  source: TreeData;
}

const parseTypography = ({ token, value, source }: Params): FontDefinition => {
  return Object.keys(value).reduce<FontDefinition>((acc, key: keyof RawFontDefinition) => {
    const fieldValue = value[key];
    if (typeof fieldValue === 'object') {
      return logError(
        `Incorrect value type for token ${token}! Values of the typography can not be the complex objects!`
      );
    }

    const { resource, reference } = getResource(fieldValue, source, token);

    if (!reference) {
      const updatedAcc = { ...acc, ...mapFontFields(key, getPxString(fieldValue)) };

      return updatedAcc;
    }

    const path: string = fieldValue.split(`${reference}.`)[1];
    const valueFromResource = get(`${path}.value`, resource);

    if (typeof valueFromResource !== 'string') {
      return acc;
    }
    const field = mapFontFields(key, getPxString(valueFromResource));

    if (Object.keys(field).length === 0) {
      return acc;
    }

    const updatedAcc = { ...acc, ...field };
    return updatedAcc;
  }, {});
};

export default parseTypography;
