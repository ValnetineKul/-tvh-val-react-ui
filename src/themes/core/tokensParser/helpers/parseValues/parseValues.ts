import get from '../get';
import logError from '../logError';
import type { TreeData } from '../parseJson';
import getResource from './getResource';

const getPxString = (value: string | number) => (Number.isNaN(Number(value)) ? `${value}` : `${value}px`);

interface Params {
  token: string;
  value: string;
  type: string;
  source: TreeData;
}
const parseValues = ({ token, value, type, source }: Params): string | undefined => {
  switch (type) {
    case 'color': {
      if (typeof value !== 'string' && typeof value !== 'number') {
        logError(`Incorrect color value for token ${token}! Values of colors should be the strings or the numbers!`);
        return '';
      }

      const { resource, reference } = getResource(value, source, token);

      if (!reference) {
        return value.toString();
      }
      const path = value.split(`${reference}.`)[1];
      return get(`${path}.value`, resource);
    }

    case 'spacing': {
      if (typeof value !== 'string' && typeof value !== 'number') {
        return logError(
          `Incorrect spacing value for token ${token}! Values of spacings should be the strings or the numbers!`
        );
      }
      return getPxString(value);
    }

    case 'borderRadius': {
      if (typeof value !== 'string' && typeof value !== 'number') {
        return logError(
          `Incorrect border-radius value for token ${token}! Values of border radiuses should be the strings or the numbers!`
        );
      }
      return getPxString(value);
    }

    default: {
      return 'unknown';
    }
  }
};

export default parseValues;
