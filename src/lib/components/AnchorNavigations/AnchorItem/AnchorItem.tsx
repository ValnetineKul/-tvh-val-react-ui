import React, { forwardRef } from 'react';
import type { ComponentProps, VFC } from 'react';
import { Link } from 'react-scroll';
import Tab from '@mui/material/Tab';
import truncate from '../../../helpers/truncate';
import ButtonBase from '../../Surfaces/ButtonBase';
import Typography from '../../Typography';
import Tooltip from '../../Tooltip';
import type { DataAttributes } from '../../../types/common';
import useStyles from './AnchorItem.styles';

export interface AnchorItemProps {
  item: {
    label: string;
    id: string;
  };
  offset?: number;
  anchorLinkProps?: React.HTMLAttributes<HTMLAnchorElement> & DataAttributes;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AnchorLink = forwardRef<never, Omit<ComponentProps<typeof Link>, 'ref'>>((props, ref) => (
  <Link {...props} ref={ref} />
));

const AnchorItem: VFC<AnchorItemProps> = ({ item, offset = 0, anchorLinkProps }) => {
  const { id, label } = item;
  const { classes } = useStyles();

  const MAX_CHARACTERS_LENGTH = 30;

  return (
    <Tab
      to={id}
      href={`#${id}`}
      role="link"
      tabIndex={0}
      label={
        <Tooltip label={label} disableHoverListener={label.length < MAX_CHARACTERS_LENGTH}>
          <Typography component="span">{truncate(label, MAX_CHARACTERS_LENGTH)}</Typography>
        </Tooltip>
      }
      smooth
      offset={offset}
      spy
      hashSpy
      activeClass={classes.active}
      classes={{ root: classes.tabItem }}
      component={({ children, ...props }) => {
        return (
          <ButtonBase
            color="300"
            className={props.className}
            focus="inset"
            component={(nestedProps) => {
              return (
                <AnchorLink {...props} {...anchorLinkProps} className={nestedProps.className}>
                  {children}
                </AnchorLink>
              );
            }}
          />
        );
      }}
    />
  );
};

export default AnchorItem;
