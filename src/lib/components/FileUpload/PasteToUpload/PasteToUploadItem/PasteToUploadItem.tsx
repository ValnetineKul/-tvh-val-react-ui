import type { FC } from 'react';
import React from 'react';
import IconButton from '../../../Buttons/IconButton';
import Icon from '../../../Icon';
import { Times, Image as ImageIcon } from '../../../Icon/icons/functional';
import ButtonBase from '../../../Surfaces/ButtonBase';
import Image from '../../../MediaItems/Image';
import Spinner from '../../../ProgressIndicators/Spinner';
import Typography from '../../../Typography';
import Surface from '../../../Surfaces/Surface';
import createAltText from '../helpers/createAltText';
import useStyles from './PasteToUploadItem.styles';

export type PasteToUploadItemStatus = 'success' | 'warning' | 'loading';

export interface PasteToUploadItemProps {
  src: string;
  fileName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
  fileStatus?: PasteToUploadItemStatus;
  index: number;
  readOnly?: boolean;
  loadingLabel?: string;
  selected?: boolean;
}

const PasteToUploadItem: FC<PasteToUploadItemProps> = ({
  src,
  fileName,
  fileStatus,
  onClick,
  onDeleteClick,
  index,
  readOnly = false,
  loadingLabel = 'Uploading...',
  selected = false,
}) => {
  const { classes, cx } = useStyles();

  const isSuccess = !fileStatus || fileStatus === 'success';
  const isWarning = fileStatus && fileStatus === 'warning';
  const isLoading = fileStatus && fileStatus === 'loading';
  const shouldShowCloseButton = !readOnly && onDeleteClick;

  const renderInnerContent = () => {
    return (
      <>
        {isSuccess && <Image src={src} alt={createAltText(index)} className={classes.image} />}
        {isWarning && (
          <div className={classes.wrapper}>
            <Icon icon={ImageIcon} className={classes.fallbackIcon} />
            <Typography variant="body300" component="span" className={classes.warningLabel}>
              {fileName}
            </Typography>
          </div>
        )}
        {isLoading && (
          <div className={classes.wrapper}>
            <Spinner size="md" />
            <Typography variant="body300" component="span">
              {loadingLabel}
            </Typography>
          </div>
        )}
      </>
    );
  };

  return (
    <Surface
      color="100"
      className={cx(classes.surface, {
        [classes.loading]: isLoading,
        [classes.warning]: isWarning,
        [classes.selected]: selected,
      })}
    >
      {readOnly ? (
        <div className={classes.imageWrapper}>{renderInnerContent()}</div>
      ) : (
        <>
          <ButtonBase color="100" onClick={onClick} className={classes.imageWrapper}>
            {renderInnerContent()}
          </ButtonBase>
          {shouldShowCloseButton && (
            <Surface color="100" className={classes.deleteImageIcon}>
              <IconButton size="md" onClick={onDeleteClick} icon={<Icon icon={Times} />} aria-label="delete item" />
            </Surface>
          )}
        </>
      )}
    </Surface>
  );
};
export default PasteToUploadItem;
