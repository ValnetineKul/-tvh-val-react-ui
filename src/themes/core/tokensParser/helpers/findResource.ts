import type { TreeData } from './parseJson';

// this function is useful to find field by reference
// like $_color, for example
const findResource = (name: string, source: TreeData): TreeData | null => {
  const actualName = name.startsWith('$') ? name.slice(1) : name;

  const stack: (TreeData | string)[] = [source];
  let currentLayer: TreeData | string | undefined;
  // simple tree traversal
  for (;;) {
    currentLayer = stack.pop();
    if (!currentLayer) return null;

    // in this cycle we are go through the object into the deep
    // and filling the stack with values of each layer
    for (;;) {
      // if the currentLayer is not an object - go to next layer from the stack
      if (!currentLayer || typeof currentLayer !== 'object' || currentLayer instanceof Array) break;

      // if resource name was found in layer
      if (actualName in currentLayer) {
        return typeof currentLayer[actualName] === 'string' ? null : (currentLayer[actualName] as TreeData);
      }

      const data = currentLayer;
      // filling the stack with layer values
      Object.keys(currentLayer).forEach((key) => {
        stack.push(data[key]);
      });

      // picking up the latest value of the layer from stack and move it to currentLayer
      currentLayer = stack.pop();
    }
  }
};

export default findResource;
