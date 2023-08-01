import getFileExtension from '../../helpers/getFileExtension';

const createDefaultFileName = (date: Date, blobNameWithExtension: string) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const fileExtension = getFileExtension(blobNameWithExtension);

  return `Screenshot_${year}-${month}-${day}_at_${hours}h${minutes}m${seconds}s.${fileExtension}`;
};

export default createDefaultFileName;
