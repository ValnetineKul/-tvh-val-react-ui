import type { TreeData } from '../parseJson';
import findResource from '../findResource';
import logError from '../logError';

const resources: Record<string, TreeData | null> = {};

const getResource = (value: string, source: TreeData, token: string) => {
  let resource: TreeData | null = null;
  let reference: string;
  const isRef = typeof value === 'string' && value.startsWith('$');
  if (isRef) {
    [reference] = value.split('.');
    if (resources[reference]) {
      resource = resources[reference];
    } else {
      resource = findResource(reference.slice(1), source);
      resources[reference] = resource;
    }

    if (!resource) {
      logError(`Wrong resource reference in the JSON for token ${token}!`);
    }

    return { resource, reference };
  }

  return {};
};

export default getResource;
