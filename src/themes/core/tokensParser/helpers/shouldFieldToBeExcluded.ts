import { typesToExclude, fieldsToExclude } from '../constants';
import type { TreeData } from './parseJson';

const shouldFieldToBeExcluded = (fieldName: string, value: TreeData | string) => {
  if (fieldsToExclude.includes(fieldName)) {
    return true;
  }

  if (typeof value === 'string') {
    return true;
  }

  if ('value' in value && typesToExclude.includes(value.type as string)) return true;

  return false;
};

export default shouldFieldToBeExcluded;
