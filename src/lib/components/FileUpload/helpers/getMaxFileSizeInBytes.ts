import convertKBToBytes from './convertKBToBytes';
import type { MaxFileSize } from '../FileUpload.constants';

const getMaxFileSizeInBytes = (maxFileSize: MaxFileSize) => {
  const sizeValue = Number(maxFileSize.match(/([0-9]*[.])?[0-9]+/)?.[0]);
  const size = maxFileSize.includes('KB') ? sizeValue : sizeValue * 1024;

  return convertKBToBytes(size);
};

export default getMaxFileSizeInBytes;
