import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { FileUpload as FileUploadIcon } from '../Icon/icons/functional';
import Icon from '../Icon';
import Typography from '../Typography';
import ButtonBase from '../Surfaces/ButtonBase';
import InlineMessage from '../InlineMessage';
import useStyles from './FileUpload.styles';
import FileUploadItem from './FileUploadItem';
import Button from '../Buttons/Button';
import type { DataAttributes } from '../../types/common';
import type { MaxFileSize, FileUploadStatus } from './FileUpload.constants';
import getMaxFileSizeInBytes from './helpers/getMaxFileSizeInBytes';
import getFileExtension from './helpers/getFileExtension';
import { mergeRefs } from '../../utils/refs';

export const getFileId = (file: File) => {
  return `${file.name}/${file.size}`;
};

type Value<Multiple> = Multiple extends true ? File[] : File | null;

export interface FileUploadProps<Multiple extends boolean = false> {
  value: Value<Multiple>;
  fileTypes?: string[];
  forbiddenFileTypes?: string[];
  shouldDisplayAllowedTypes?: boolean;
  shouldDisplayForbiddenTypes?: boolean;
  additionalRestriction?: string;
  fileStatuses?: Record<string, FileUploadStatus>;
  maxFileSize?: MaxFileSize;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  multiple?: Multiple;
  readOnly?: boolean;
  variant?: 'basic' | 'dragAndDrop';
  fileSizeErrorMessage?: string;
  fileTypeErrorMessage?: string;
  fileDuplicationErrorMessage?: string;
  acceptedFileTypesLabel?: string;
  forbiddenFileTypesLabel?: string;
  maximumFileSizeLabel?: string;
  dragAndDropLabel?: string;
  basicDragAndDropLabel?: string;
  onChange: (files: Value<Multiple>) => void;
  onFilesUpload?: (files: Value<Multiple>) => void;
  onFileDelete?: (file: Value<false>) => void;
  getCustomFileName?: (file: File) => string;
  inputProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  deleteIconProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface FileUploadRef {
  hideInternalErrors: () => void;
}

export interface FileUploadComponent {
  <Multiple extends boolean = false>(
    props: FileUploadProps<Multiple> & { ref?: React.Ref<FileUploadRef> }
  ): JSX.Element | null;
}

const FileUploadRaw = <Multiple extends boolean = false>(
  {
    value,
    label,
    fileTypes = [],
    forbiddenFileTypes = [],
    fileStatuses,
    maxFileSize,
    required,
    errorMessage,
    disabled,
    className,
    shouldDisplayAllowedTypes = true,
    shouldDisplayForbiddenTypes = true,
    additionalRestriction,
    fullWidth = false,
    multiple = false as never,
    readOnly = false,
    variant = 'dragAndDrop',
    fileSizeErrorMessage = 'Attachment must be less than',
    fileTypeErrorMessage = 'This file format is not allowed',
    fileDuplicationErrorMessage = 'File with same name has already been uploaded',
    acceptedFileTypesLabel = 'Accepted file types',
    forbiddenFileTypesLabel = 'Not accepted file types',
    maximumFileSizeLabel = 'Maximum file size',
    dragAndDropLabel = 'Drag and drop files or click to upload',
    basicDragAndDropLabel = 'Upload file',
    onChange,
    onFilesUpload,
    onFileDelete,
    getCustomFileName,
    inputProps,
    buttonProps,
    deleteIconProps,
    inputRef,
  }: FileUploadProps<Multiple>,
  ref: React.Ref<FileUploadRef>
): JSX.Element => {
  const { classes, cx } = useStyles({ surface: '150' });
  const [isFileSizeError, setIsFileSizeError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [isFileDuplicationError, setIsFileDuplicationError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHideErrors = () => {
    setIsFileSizeError(false);
    setIsFileTypeError(false);
    setIsFileDuplicationError(false);
  };

  useImperativeHandle(ref, () => ({
    hideInternalErrors: handleHideErrors,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleHideErrors();
    const maxFileSizeInBytes = (() => {
      if (!maxFileSize) return;
      return getMaxFileSizeInBytes(maxFileSize);
    })();

    if (!event.target.files) {
      if (!multiple) {
        onChange(null as Value<Multiple>);
      } else {
        onChange(value);
      }
      return;
    }

    const files = Array.from(event.target.files);

    const allowedExtensions = fileTypes?.map((type) => type.toLowerCase()) || [];
    const forbiddenExtensions = forbiddenFileTypes?.map((type) => type.toLowerCase()) || [];

    const validFiles = files.reduce<File[]>((arr, file) => {
      const extension = getFileExtension(file.name);

      const isAllowedType = () => {
        if (!extension) {
          return false;
        }
        if (fileTypes?.length > 0 && extension) {
          return allowedExtensions.includes(extension);
        }
        return true;
      };

      const isNotForbiddenType = () => {
        if (forbiddenExtensions?.length > 0 && extension) {
          return !forbiddenExtensions.includes(extension);
        }
        return true;
      };

      const isSupportedType = isAllowedType() && isNotForbiddenType();
      const isSupportedSize = maxFileSizeInBytes ? file?.size <= maxFileSizeInBytes : true;
      const isNotDuplicated = multiple
        ? !(value as Value<true>).some((validFile) => validFile.name === file.name)
        : true;

      if (isSupportedType && isSupportedSize && isNotDuplicated) {
        if (getCustomFileName) {
          const newFileName = getCustomFileName(file);
          if (newFileName !== file.name) {
            const renamedFile = new File([file], newFileName, {
              type: file.type,
            });
            return [...arr, renamedFile];
          }
        }
        return [...arr, file];
      }
      setIsFileSizeError(!isSupportedSize);
      setIsFileTypeError(!isSupportedType);
      setIsFileDuplicationError(!isNotDuplicated);

      return arr;
    }, []);

    if (!validFiles.length) {
      return;
    }

    if (!multiple) {
      onChange(validFiles[0] as Value<Multiple>);
      onFilesUpload?.(validFiles[0] as Value<Multiple>);
      return;
    }
    onChange([...(value as Value<true>), ...validFiles] as Value<Multiple>);
    onFilesUpload?.(validFiles as Value<Multiple>);
  };

  const rootClassName = cx(classes.root, className, {
    [classes.disabled]: !!disabled,
    [classes.fullWidth]: fullWidth,
  });

  const errorMessageComposed =
    errorMessage ||
    (isFileSizeError && `${fileSizeErrorMessage} ${maxFileSize}`) ||
    (isFileTypeError && fileTypeErrorMessage) ||
    (isFileDuplicationError && fileDuplicationErrorMessage);

  const mainClassName = cx(classes.main, {
    [classes.hasError]: !!errorMessageComposed,
  });
  const accept = fileTypes.map((type) => `.${type}`).join(', ');

  const renderInput = () => {
    return (
      <input
        ref={mergeRefs([inputRef, fileInputRef])}
        aria-label={label || 'file-upload-input'}
        type="file"
        className={cx(classes.input, {
          [classes.basicInput]: variant === 'basic',
        })}
        disabled={disabled}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        tabIndex={variant === 'basic' ? -1 : undefined}
        value=""
        {...inputProps}
      />
    );
  };

  const renderFileInfo = () => {
    return (
      <>
        {shouldDisplayAllowedTypes && fileTypes?.length > 0 && (
          <Typography variant="body400" secondary className={classes.secondaryText}>
            {acceptedFileTypesLabel}: {fileTypes.map((type) => type.toUpperCase()).join(', ')}
          </Typography>
        )}

        {shouldDisplayForbiddenTypes && forbiddenFileTypes?.length > 0 && (
          <Typography variant="body400" secondary className={classes.secondaryText}>
            {forbiddenFileTypesLabel}: {forbiddenFileTypes.map((type) => type.toUpperCase()).join(', ')}
          </Typography>
        )}

        {maxFileSize && (
          <Typography variant="body400" secondary className={classes.secondaryText}>
            {maximumFileSizeLabel}: {maxFileSize}
          </Typography>
        )}

        {additionalRestriction && (
          <Typography variant="body400" secondary className={classes.secondaryText}>
            {additionalRestriction}
          </Typography>
        )}
      </>
    );
  };

  const renderDragAndDrop = () => {
    return (
      <ButtonBase color="150" className={mainClassName} component="div" border disabled={disabled} tabIndex={-1}>
        {renderInput()}

        <Icon className={cx(classes.icon, classes.block)} icon={FileUploadIcon} />
        <Typography className={classes.block}>{dragAndDropLabel}</Typography>
        {renderFileInfo()}
      </ButtonBase>
    );
  };

  const renderBasic = () => {
    return (
      <>
        {renderInput()}
        <div className={classes.basicFileInfo}>{renderFileInfo()}</div>
        <Button
          variant="secondary"
          label={basicDragAndDropLabel}
          startIcon={<Icon icon={FileUploadIcon} />}
          disabled={disabled}
          onClick={() => {
            fileInputRef.current?.click();
          }}
          {...buttonProps}
        />
      </>
    );
  };

  const renderComponent = () => {
    if (variant === 'dragAndDrop') return renderDragAndDrop();
    return renderBasic();
  };

  const isSingle = !multiple && value === null;

  return (
    <div className={rootClassName}>
      {label && (
        <Typography variant="body400" className={classes.label}>
          {label}
          {required && <span className={classes.required}>&nbsp;*</span>}
        </Typography>
      )}

      {!readOnly && (isSingle || multiple) && renderComponent()}

      {errorMessageComposed && (
        <InlineMessage
          className={cx(classes.errorMessage, {
            [classes.basicErrorMessage]: variant === 'basic',
          })}
          message={errorMessageComposed}
          status="error"
          size="sm"
        />
      )}

      {multiple &&
        !disabled &&
        (value as Value<true>).map((file, index) => {
          return (
            <FileUploadItem
              deleteIconProps={deleteIconProps}
              fileName={file.name}
              fileStatus={fileStatuses?.[getFileId(file)]}
              key={index}
              readOnly={readOnly}
              onClick={() => {
                const res = [...(value as Value<true>)];
                res.splice(index, 1);
                onChange(res as Value<Multiple>);
                onFileDelete?.(file);
                handleHideErrors();
              }}
            />
          );
        })}
      {!!value && !multiple && !disabled && !Array.isArray(value) && (
        <FileUploadItem
          fileName={value.name}
          fileStatus={fileStatuses?.[getFileId(value)]}
          readOnly={readOnly}
          onClick={() => {
            onChange(null as Value<Multiple>);
            onFileDelete?.(value);
            handleHideErrors();
          }}
        />
      )}
    </div>
  );
};

const FileUpload: FileUploadComponent = forwardRef(FileUploadRaw);

export default FileUpload;
