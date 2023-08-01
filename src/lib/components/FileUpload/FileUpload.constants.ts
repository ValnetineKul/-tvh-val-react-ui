export const DEFAULT_MAX_FILE_SIZE_IN_BYTES = '500 KB';

export type MaxFileSize = `${number}${'KB' | 'MB'}`;
export type FileUploadStatus = 'success' | 'warning' | 'loading';
