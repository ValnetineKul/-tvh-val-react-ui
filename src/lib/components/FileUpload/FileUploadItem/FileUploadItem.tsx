import type { FC } from 'react';
import React from 'react';
import type { DataAttributes } from '../../../types/common';
import IconButton from '../../Buttons/IconButton';
import Icon from '../../Icon';
import { Times } from '../../Icon/icons/functional';
import InlineMessage from '../../InlineMessage';
import Surface from '../../Surfaces/Surface';
import useStyles from './FileUploadItem.styles';

export interface FileUploadItemProps {
  deleteIconProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  fileName: string;
  fileStatus?: 'success' | 'warning' | 'loading';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  index?: number;
  readOnly?: boolean;
}

const FileUploadItem: FC<FileUploadItemProps> = ({
  deleteIconProps,
  fileName,
  fileStatus,
  onClick,
  index,
  readOnly,
}) => {
  const { classes } = useStyles();

  return (
    <Surface color="150" className={classes.root} key={index}>
      <InlineMessage className={classes.inlineMessage} status={fileStatus} message={fileName} />
      {!readOnly && (
        <IconButton
          aria-label={`remove-button-${fileName}`}
          icon={<Icon icon={Times} />}
          onClick={onClick}
          {...deleteIconProps}
        />
      )}
    </Surface>
  );
};
export default FileUploadItem;
