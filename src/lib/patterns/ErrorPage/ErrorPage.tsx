import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import Button from '../../components/Buttons/Button';
import Image from '../../components/MediaItems/Image';
import Typography from '../../components/Typography';
import type { DataAttributes, ObjectValuesUnion } from '../../types/common';
import { ERROR_CODES } from './constants';
import { Lost, NoAccess, General, GeneralAlt, Maintenance } from '../../components/Illustrations/illustrations';
import useStyles from './ErrorPage.styles';

type ErrorCode = ObjectValuesUnion<typeof ERROR_CODES>;

export type LinkType = {
  name: string;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
} & ({ url: string; cb?: never } | { cb: () => void; url?: never });

export interface ErrorPageProps {
  header: string;
  description: string | JSX.Element;
  className?: string;
  errorCode?: ErrorCode;
  links?: LinkType[];
  reference?: string;
  errorCodeClassName?: string;
  onReload?: () => void;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const errorCodes = [
  ERROR_CODES.BAD_REQUEST,
  ERROR_CODES.NOT_AUTHORIZED,
  ERROR_CODES.PADE_NOT_FOUND,
  ERROR_CODES.LOCKED,
  ERROR_CODES.INTERNAL_SERVER_ERROR,
  ERROR_CODES.BAD_GATEWAY,
  ERROR_CODES.SERVICE_UNAVAILABLE,
  ERROR_CODES.GATEWAY_TIMEOUT,
];

const errorCodesForLinks = [
  ERROR_CODES.BAD_REQUEST,
  ERROR_CODES.NOT_AUTHORIZED,
  ERROR_CODES.PADE_NOT_FOUND,
  ERROR_CODES.LOCKED,
  ERROR_CODES.INTERNAL_SERVER_ERROR,
];

const pagesWithoutReloadButton = [
  ERROR_CODES.BAD_REQUEST,
  ERROR_CODES.NOT_AUTHORIZED,
  ERROR_CODES.PADE_NOT_FOUND,
  ERROR_CODES.LOCKED,
  ERROR_CODES.MAINTENANCE,
];

const images = {
  [ERROR_CODES.BAD_REQUEST]: Lost,
  [ERROR_CODES.NOT_AUTHORIZED]: NoAccess,
  [ERROR_CODES.PADE_NOT_FOUND]: Lost,
  [ERROR_CODES.LOCKED]: NoAccess,
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: General,
  [ERROR_CODES.BAD_GATEWAY]: GeneralAlt,
  [ERROR_CODES.SERVICE_UNAVAILABLE]: General,
  [ERROR_CODES.GATEWAY_TIMEOUT]: GeneralAlt,
  [ERROR_CODES.MAINTENANCE]: Maintenance,
};

const ErrorPage: FC<ErrorPageProps> = ({
  header,
  description,
  errorCode,
  onReload,
  links,
  reference,
  className,
  errorCodeClassName,
  buttonProps,
}) => {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  const isErrorCodeAvailable = errorCode && !!errorCodes.find((code) => code === errorCode);
  const isReferenceAvailable = reference && errorCode !== ERROR_CODES.MAINTENANCE;
  const isReloadAvailable = onReload && (!errorCode || !pagesWithoutReloadButton.find((code) => code === errorCode));
  const isLinksAvailable = errorCode && !!errorCodesForLinks.find((code) => code === errorCode);

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.contentWrapper}>
        <Typography className={classes.header} variant="h1">
          {header}
        </Typography>
        {typeof description === 'string' ? (
          <Typography className={classes.description}>{description}</Typography>
        ) : (
          description
        )}
        {isErrorCodeAvailable && (
          <Typography
            className={cx({ [classes.errorCode]: !reference }, classes.displayBlock, errorCodeClassName)}
            component="span"
          >
            Error code: {errorCode}
          </Typography>
        )}
        {isReferenceAvailable && (
          <Typography className={cx({ [classes.errorCode]: isReloadAvailable }, classes.displayBlock)} component="span">
            Reference: {reference}
          </Typography>
        )}
        {isReloadAvailable && <Button {...buttonProps} onClick={onReload} variant="primary" label="Reload the page" />}
        {isLinksAvailable && links && links.length > 0 && (
          <>
            <Typography className={classes.options} variant="h2">
              Here are some options for you:
            </Typography>
            <ul className={classes.links}>
              {links.map((linkProp, key) => {
                return (
                  <li key={key} className={classes.listItem}>
                    {linkProp.cb ? (
                      <Button {...linkProp.buttonProps} variant="link" label={linkProp.name} onClick={linkProp.cb} />
                    ) : (
                      <Button
                        {...linkProp.buttonProps}
                        variant="link"
                        label={linkProp.name}
                        to={linkProp.url}
                        component={Link}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      {isTabletUp && (
        <div className={classes.imageWrapper}>
          <Image
            className={classes.image}
            src={errorCode && errorCode in images ? images[errorCode] : General}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
