import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Image from '../../MediaItems/Image';
import TextField from '../../TextField';
import Modal from '../../../patterns/Dialogs/Modal';
import DialogContent from '../../../patterns/Dialogs/DialogContent';
import getMaxFileSizeInBytes from '../helpers/getMaxFileSizeInBytes';
import createDefaultFileName from './helpers/createDefaultFileName';
import createAltText from './helpers/createAltText';
import PasteToUploadItem from './PasteToUploadItem';
import type { PasteToUploadItemStatus } from './PasteToUploadItem/PasteToUploadItem';
import type { MaxFileSize } from '../FileUpload.constants';
import { DEFAULT_MAX_FILE_SIZE_IN_BYTES } from '../FileUpload.constants';
import useStyles from './PasteToUpload.styles';

export interface PasteToUploadProps {
  updateFilesCb: (files: Record<string, File>) => void;
  multiple?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  fileStatuses?: Record<string, PasteToUploadItemStatus>;
  getCustomFileName?: (file: File) => string;
  maxFileSize?: MaxFileSize;
  pasteToUploadLabel?: string;
  fileSizeErrorMessage?: string;
  fileDuplicationErrorMessage?: string;
  fileClipboardTypeErrorMessage?: string;
}

type FileProps = {
  [x: string]: File;
};

type ImageProps = {
  fileName: string;
  src: string;
  alt: string;
};

export interface PasteToUploadRef {
  hideInternalErrors: () => void;
}
export interface PasteToUploadComponent {
  (props: PasteToUploadProps & { inputElementRef?: React.Ref<PasteToUploadRef> }): JSX.Element | null;
}

const PasteToUploadRaw = (
  {
    updateFilesCb,
    multiple = false,
    readOnly = false,
    disabled = false,
    errorMessage,
    fileStatuses,
    getCustomFileName,
    maxFileSize = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    pasteToUploadLabel = 'Paste from clipboard',
    fileSizeErrorMessage = 'Attachment must be less than',
    fileDuplicationErrorMessage = 'The same image has recently been uploaded',
    fileClipboardTypeErrorMessage = 'This is not allowed to paste data that is not an image',
  }: PasteToUploadProps,
  inputElementRef: React.Ref<PasteToUploadRef>
): JSX.Element => {
  const { classes, cx } = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileProps>({});
  const [imageSizeList, setImageSizeList] = useState<Set<number>>(new Set());
  const [activeImage, setActiveImage] = useState<ImageProps | Record<string, never>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isFileSizeError, setIsFileSizeError] = useState(false);
  const [isFileDuplicationError, setIsFileDuplicationError] = useState(false);
  const [isFileClipboardTypeError, setIsClipboardTypeError] = useState(false);

  const handleHideErrors = () => {
    setIsFileSizeError(false);
    setIsFileDuplicationError(false);
    setIsClipboardTypeError(false);
  };

  useImperativeHandle(inputElementRef, () => ({
    hideInternalErrors: handleHideErrors,
  }));

  const errorMessageComposed =
    errorMessage ||
    (isFileSizeError && `${fileSizeErrorMessage} ${maxFileSize}`) ||
    (isFileDuplicationError && `${fileDuplicationErrorMessage}`) ||
    (isFileClipboardTypeError && `${fileClipboardTypeErrorMessage}`);

  const addNewFiles = (blob: File) => {
    if (blob.size > getMaxFileSizeInBytes(maxFileSize)) {
      setIsFileSizeError(true);
    }

    if (blob.size <= getMaxFileSizeInBytes(maxFileSize)) {
      const date = new Date(blob.lastModified);
      const defaultFileName = createDefaultFileName(date, blob.name);
      const fileName = getCustomFileName ? getCustomFileName(blob) : defaultFileName;

      if (!multiple) {
        return { [fileName]: blob };
      }

      files[fileName] = blob;
    }

    return { ...files };
  };

  const handleNewFileUpload = (e: React.ClipboardEvent<HTMLInputElement>) => {
    handleHideErrors();

    if (disabled) {
      return;
    }
    const { items } = e.clipboardData;
    let blob: File = null;

    // When you copy something, your selection is held on the Clipboard,
    // where it remains until you copy something else or shut down your computer.
    // This means that you can paste the same data multiple times and in different applications.
    // The Clipboard holds only the last selection that you copied.
    // (The clipboard limited you to copying and pasting only one item at a time.)
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && items[i].type.match('^image/')) {
        blob = items[i].getAsFile();
      } else {
        setIsClipboardTypeError(true);
        return;
      }
    }

    if (blob !== null) {
      if (imageSizeList.has(blob.size)) {
        setIsFileDuplicationError(true);
        return;
      }

      if (!multiple && imageSizeList.size === 1) {
        setImageSizeList((prev) => new Set([...prev].filter((x) => x === blob.size)));
      }

      setImageSizeList((prev) => new Set([...prev, blob.size]));

      const updatedFiles = addNewFiles(blob);
      setFiles({ ...updatedFiles });
      updateFilesCb({ ...updatedFiles });
    }
  };

  const removeFile = (fileName: string, fileSize: number) => {
    const filteredFiles = Object.keys(files)
      .filter((key) => key !== fileName)
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: files[key],
        });
      }, {});
    setFiles({ ...filteredFiles });

    setImageSizeList((prev) => new Set([...prev].filter((x) => x !== fileSize)));

    isFileDuplicationError && setIsFileDuplicationError(false);

    updateFilesCb({ ...filteredFiles });
    isDialogOpen && setIsDialogOpen(false);
  };

  const handleSetActiveImage = (fileName: string, index: number) => {
    setActiveImage({
      ...activeImage,
      fileName,
      src: URL.createObjectURL(files[fileName]),
      alt: createAltText(index),
    });
  };

  const handleClickDialogOpen = (fileName: string, index: number) => {
    handleSetActiveImage(fileName, index);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const renderMainImage = () => {
    return (
      <div className={classes.dialogImage}>
        <Image src={activeImage.src} alt={activeImage.alt} />
      </div>
    );
  };

  return (
    <>
      <TextField
        type="text"
        autoComplete="off"
        onPaste={handleNewFileUpload}
        label={pasteToUploadLabel}
        errorMessage={errorMessageComposed}
        disabled={disabled}
        inputElementRef={fileInputRef}
        fullWidth
        // Async Clipboard API supports a limited set of MIME types
        // to be copied to and pasted from the system clipboard:
        // text/plain, text/html, and image/png - for chromium
        // text/plain, text/html, image/png and text/uri-list - for webkit
        // (https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/clipboard/clipboard_writer.cc;drc=e882b8e4a8272f65cb14c608d3d2bc4f0512aa20;l=304)
        inputProps={{ accept: '.png' }}
        // to prevent the user from typing (only copy-past)
        value=""
      />
      {!!Object.keys(files).length && !disabled && (
        <ul className={cx(classes.resetList, classes.imageList)}>
          {Object.keys(files).map((fileName, index) => {
            const file = files[fileName];
            const fileKey = file.lastModified;
            return (
              <li key={fileKey} className={classes.imageListItem}>
                <PasteToUploadItem
                  index={index}
                  src={URL.createObjectURL(file)}
                  fileName={activeImage.fileName}
                  onClick={() => handleClickDialogOpen(fileName, index)}
                  onDeleteClick={() => removeFile(fileName, file.size)}
                  readOnly={readOnly}
                  fileStatus={fileStatuses?.[fileName]}
                />
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        open={isDialogOpen}
        onClose={handleDialogClose}
        id={activeImage.fileName}
        title={activeImage.fileName}
        size="lg"
      >
        <DialogContent>
          {Object.keys(files).length === 1 && renderMainImage()}

          {Object.keys(files).length !== 1 && (
            <div className={classes.dialogImageWrapper}>
              <ul className={cx(classes.resetList, classes.dialogImageList)}>
                {Object.keys(files).map((fileName, index) => {
                  return (
                    <li key={files[fileName].lastModified} className={classes.dialogImageListItem}>
                      <PasteToUploadItem
                        index={index}
                        src={URL.createObjectURL(files[fileName])}
                        fileName={fileName}
                        onClick={() => handleSetActiveImage(fileName, index)}
                        selected={fileName === activeImage.fileName}
                      />
                    </li>
                  );
                })}
              </ul>
              {renderMainImage()}
            </div>
          )}
        </DialogContent>
      </Modal>
    </>
  );
};

const PasteToUpload: PasteToUploadComponent = forwardRef(PasteToUploadRaw);

export default PasteToUpload;
