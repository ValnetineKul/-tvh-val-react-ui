import type { Data, ThemeId, DataField, RawFontDefinition } from '../types';
import type { FontDefinition } from '../../types/FontDefinition';
import logError from './logError';
import { parseValues, parseTypography } from './parseValues';
import shouldFieldToBeExcluded from './shouldFieldToBeExcluded';

export interface TreeData {
  [x: string]: TreeData | string;
}

const parseTheme = (data: TreeData) => {
  const result: Partial<Record<DataField, Record<string, string | undefined>>> &
    Partial<{
      typography: Record<string, FontDefinition>;
    }> = {};
  let root: string;

  return (function handler(structure: TreeData, tokenChunk?: string, level = 0) {
    Object.keys(structure).forEach((key) => {
      if (shouldFieldToBeExcluded(key, structure[key])) {
        return null;
      }

      const layerData = structure[key] as TreeData;
      const isRootField = level === 1;

      if (isRootField) {
        root = tokenChunk as string;
      }

      const token = isRootField || !tokenChunk ? key : `${tokenChunk}/${key}`;

      if ('value' in layerData) {
        if (typeof layerData.type !== 'string') {
          return logError(`Incorrect format of the token ${token}: 'type' field is not a string!`);
        }

        if (layerData.type === 'typography') {
          if (!result.typography) {
            result.typography = {};
          }

          result.typography[`${root}/${token}`] = parseTypography({
            token,
            value: layerData.value as unknown as RawFontDefinition,
            source: data,
          });
          return;
        }

        const l = layerData as { value: string; type: DataField };
        if (!result[l.type]) {
          result[l.type] = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result[l.type]![`${root}/${token}`] = parseValues({
          token,
          value: l.value,
          type: l.type,
          source: data,
        });

        return null;
      }

      return handler(layerData, token, level + 1);
    });

    return result;
  })(data);
};

const parseJson = (rawJSON: string): Data => {
  const wholeSource: {
    message?: string;
    record: {
      values: Record<ThemeId, TreeData>;
    };
  } = JSON.parse(rawJSON);
  if (wholeSource.message) {
    logError(`${wholeSource.message}. Try to wrap it with quotes!`);
  }

  const data = wholeSource.record.values;

  const result: Data = {};

  Object.keys(data).forEach((themeId: ThemeId) => {
    result[themeId] = parseTheme(data[themeId]);
  });

  return result;
};

export default parseJson;
