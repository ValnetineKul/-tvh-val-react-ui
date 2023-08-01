import React from 'react';
import Typography from '../Typography';
import { createMeta } from '../../story-utils';
import { makeStyles } from '../../../themes/core';
import Image from '../MediaItems/Image';
import * as illustrations from './illustrations';

const useStyles = makeStyles()((theme) => ({
  list: {
    padding: theme.layoutSpacing['spacing/000'],
    margin: theme.layoutSpacing['spacing/000'],
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: theme.layoutSpacing['spacing/450'],
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.layoutSpacing['spacing/350'],
    border: `1px solid ${theme.color['border/onSurfaceCurrent/default']}`,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

const IllustrationTemplate = () => {
  const { classes } = useStyles();
  const illustrationsSrcList: string[] = Object.values(illustrations);

  return (
    <ul className={classes.list}>
      {illustrationsSrcList.map((src, idx) => {
        const illustrationName = Object.keys(illustrations).find((key) => illustrations[key] === src);
        const alt = illustrationName
          .split(/(?=[A-Z])/)
          .map((name) => name.toLowerCase())
          .join(' ');
        const shortSrc = `${illustrationName[0].toLowerCase() + illustrationName.slice(1)}.svg`;
        return (
          <li key={idx} className={classes.listItem}>
            <Image src={src} alt={alt} className={classes.image} />
            <Typography component="span">{shortSrc}</Typography>
          </li>
        );
      })}
    </ul>
  );
};

export const Illustrations = IllustrationTemplate.bind({});

export default createMeta({
  component: Illustrations,
  title: 'Foundations/Illustrations',
});
