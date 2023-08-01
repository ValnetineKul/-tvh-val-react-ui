import type { Node } from 'figma-api';

export const parseFigmaNodes = (rootNode: Node): Node<'COMPONENT_SET'>[] => {
  return (function hanlder(node: Node, sets: Node<'COMPONENT_SET'>[] = []): Node<'COMPONENT_SET'>[] {
    return (node as Node<'FRAME'>).children.reduce<Node<'COMPONENT_SET'>[]>((acc, childNode) => {
      if (childNode.type === 'COMPONENT_SET') {
        return acc.concat(childNode as Node<'COMPONENT_SET'>);
      }

      if (childNode.type !== 'FRAME') {
        return acc;
      }

      return hanlder(childNode, acc);
    }, sets);
  })(rootNode);
};
