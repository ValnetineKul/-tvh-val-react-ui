export const getFilePath = (fileName: string, directory: string, extension: `.${string}` = '.svg') => {
  return `${directory}/${fileName}${extension}`;
};
