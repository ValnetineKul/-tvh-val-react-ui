export const getIndexFileContent = (iconsFilesNames: string[]) => {
  return `${iconsFilesNames
    .map((name) => {
      const capitalizedName = name.replace(name[0], name[0].toUpperCase());

      return `export { ReactComponent as ${capitalizedName} } from './svg/${name}.svg';\n`;
    })
    .join('')}`;
};
