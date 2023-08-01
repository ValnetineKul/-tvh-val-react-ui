interface RecursiveObject {
  [x: string]: RecursiveObject | string;
}

const get = (path: string, object?: RecursiveObject | null): string | undefined => {
  const fields = path.split('.');
  if (!object) {
    return;
  }

  return (function handler(o: RecursiveObject, i = 0): string | undefined {
    const val = o[fields[i]];
    if (!val) {
      return;
    }
    if (typeof val === 'string') {
      return val;
    }

    return handler(val, i + 1);
  })(object);
};

export default get;
