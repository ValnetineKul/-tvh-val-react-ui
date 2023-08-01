const getFileExtension = (name: string) => {
  if (name.indexOf('.') === -1) {
    return null;
  }
  return name.toLowerCase().split('.').pop();
};

export default getFileExtension;
