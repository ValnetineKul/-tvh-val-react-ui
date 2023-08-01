import type { FC, ReactNode } from 'react';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import IconButton from '../../Buttons/IconButton';
import Container from '../../Container';
import { AngleLeft, AngleRight } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import Surface from '../../Surfaces/Surface';
import Typography from '../../Typography';
import AnchorItem from '../AnchorItem';
import useStyles from './AnchorNavigation.styles';
import type { DataAttributes } from '../../../types/common';

interface AnchorNavigationItem {
  label: string;
  component: ReactNode;
  surface?: '100' | '200' | '300';
  anchorLinkProps?: React.HTMLAttributes<HTMLAnchorElement> & DataAttributes;
}

export interface AnchorNavigationProps {
  items: AnchorNavigationItem[];
  headersType?: 'functional' | 'commercial';
  offset?: number;
}

const AnchorNavigation: FC<AnchorNavigationProps> = ({ items, headersType = 'functional', offset = 0 }) => {
  const { classes } = useStyles({ offset });

  const ScrollButtonComponent = (props: React.ComponentProps<typeof IconButton> & { direction: 'left' | 'right' }) => {
    if (props.direction === 'left') {
      return <IconButton {...props} className={classes.iconButton} focus="inset" icon={<Icon icon={AngleLeft} />} />;
    }
    if (props.direction === 'right') {
      return <IconButton {...props} className={classes.iconButton} focus="inset" icon={<Icon icon={AngleRight} />} />;
    }
    return null;
  };

  const createId = (key: number) => `anchor-navigation-${key}`;
  const itemsWithIds = items.map((item, key) => ({ ...item, id: createId(key) }));

  const renderAnchorItems = (item: AnchorNavigationItem & { id: string }, key: number) => {
    return (
      // workaround with offset because active class is not set on initial render in react-scroll https://github.com/fisshy/react-scroll/issues/104
      <AnchorItem
        item={item}
        offset={key === 0 ? -(offset + 60) : -(offset + 40)}
        key={key}
        anchorLinkProps={item.anchorLinkProps}
      />
    );
  };

  const renderContent = (item: AnchorNavigationItem, key: number) => {
    const { label, component, surface = '100' } = item;

    return (
      <section id={createId(key)} data-navitem={label} key={key}>
        <Surface color={surface} className={classes.anchorComponent}>
          <Container>
            <Typography variant="h2" headerType={headersType} className={classes.header}>
              {label}
            </Typography>
            {component}
          </Container>
        </Surface>
      </section>
    );
  };

  return (
    <>
      <Surface color="300" className={classes.root} component="nav">
        <Container>
          <Tabs
            value={false}
            variant="scrollable"
            scrollButtons="auto"
            ScrollButtonComponent={ScrollButtonComponent}
            classes={{
              root: classes.anchorList,
              indicator: classes.indicator,
            }}
          >
            {itemsWithIds.map(renderAnchorItems)}
          </Tabs>
        </Container>
      </Surface>
      {items.map(renderContent)}
    </>
  );
};

export default AnchorNavigation;
