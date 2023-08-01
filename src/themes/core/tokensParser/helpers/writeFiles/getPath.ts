import type { Data, DataFields } from '../../types';

const TokensPathsEnum: Record<keyof Data, string> = {
  global: '../../../../tvh/tokens/',
  agri: '../../../../agri/tokens/',
  darkmode: '../../../../darkmode/src/lib/tokens/',
};

const TokensFilesNamesEnum: Record<keyof DataFields, string> = {
  typography: 'typography.json',
  color: 'color.json',
  spacing: 'layoutSpacing.json',
  borderRadius: 'borderRadius.json',
};

const getPath = (theme: keyof Data, field: keyof DataFields) => {
  return `${TokensPathsEnum[theme] + TokensFilesNamesEnum[field]}`;
};

export default getPath;
