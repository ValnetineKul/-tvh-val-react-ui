export const getIconFileName = (rawIconName: string) => {
  const capitalizedIconName = rawIconName.split(/[-_/]/).reduce((acc, chunk) => {
    const capitalizedChunk = chunk.replace(chunk[0], chunk[0].toUpperCase());
    return acc + capitalizedChunk;
  }, '');

  return capitalizedIconName.replace(capitalizedIconName[0], capitalizedIconName[0].toLowerCase());
};
