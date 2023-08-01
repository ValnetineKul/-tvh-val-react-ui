import { action } from '@storybook/addon-actions';
import React from 'react';
import { makeStyles } from '../../../themes/core';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import Button from '../Buttons/Button';
import Typography from '../Typography';
import Card from './Card';
import CardContent from './CardContent/CardContent';
import CardFooter from './CardFooter/CardFooter';
import CardHeader from './CardHeader/CardHeader';
import filterImage from './mocked-assets/filter.jpg';

import MenuItem from '../Menus/MenuItem';
import OverflowAction from '../../patterns/OverflowAction';

const menuItems = [
  <MenuItem label="item_1" onClick={action('onItemClick')} />,
  <MenuItem label="item_2" onClick={action('onItemClick')} />,
  <MenuItem label="item_3" onClick={action('onItemClick')} />,
];

const useStyles = makeStyles()((theme) => ({
  list: {
    listStyle: 'none',
    margin: theme.layoutSpacing['spacing/000'],
    padding: theme.layoutSpacing['spacing/000'],

    display: 'flex',
    gap: 24,
  },
  listItem: {
    flexGrow: 1,
    flexBasis: 0,
  },
  horizontalList: {
    flexDirection: 'column',
  },
  verticalCard: {
    minWidth: 240,
    maxWidth: 436,
  },
  overflowAction: {
    display: 'inline-block',
    marginLeft: theme.layoutSpacing['spacing/400'],
  },
}));

type Props = React.ComponentProps<typeof Card>;

const shortCardContent = <span>Card Content</span>;

const cardContent = (
  <div>
    <Typography variant="body500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad blanditiis ex nam necessitatibus nihil
      nostrum quam quidem repudiandae tempora!
    </Typography>
    <Button label="Read more" variant="link" onClick={action('onReadMoreButtonClick')} />
  </div>
);

const RenderCard = (args: Props, content: JSX.Element = shortCardContent) => {
  const { classes, cx } = useStyles();
  return (
    <Card {...args} className={cx({ [classes.verticalCard]: args.direction === 'vertical' })}>
      <CardHeader title="Card Header" subtitle="Subtitle" />
      <CardContent>{content}</CardContent>
      <CardFooter>
        <Button label="Action button" variant="primary" onClick={action('onActionButtonClick')} />
        <div className={classes.overflowAction}>
          <OverflowAction menuItems={menuItems} closeMenuOnItemClick />
        </div>
      </CardFooter>
    </Card>
  );
};

const Template = ((args: Props) => RenderCard(args, cardContent)) as StoryTemplate<Props>;

const CardListTemplate = (args: Props) => {
  const { classes, cx } = useStyles();
  return (
    <ul className={cx(classes.list, cx({ [classes.horizontalList]: args.direction === 'horizontal' }))}>
      <li className={classes.listItem}>{RenderCard({ ...args, wrapper: undefined }, cardContent)}</li>
      <li className={classes.listItem}>{RenderCard({ ...args, wrapper: undefined })}</li>
      <li className={classes.listItem}>{RenderCard({ ...args, wrapper: undefined }, cardContent)}</li>
      <li className={classes.listItem}>{RenderCard({ ...args, wrapper: undefined })}</li>
    </ul>
  );
};

export const Primitive = Template.bind({});
Primitive.args = {
  wrapper: <Button label="Test" variant="primary" onClick={action('onCardClick')} />,
  image: {
    image: filterImage,
  },
  direction: 'horizontal',
};
Primitive.storyName = 'Card';
Primitive.argTypes = {
  direction: {
    control: {
      disable: false,
    },
  },
};

export const VerticalCardsList = CardListTemplate.bind({});
VerticalCardsList.args = {
  ...Primitive.args,
  direction: 'vertical',
};
VerticalCardsList.storyName = 'VerticalCardsList';

export const HorizontalCardsList = CardListTemplate.bind({});
HorizontalCardsList.args = {
  ...Primitive.args,
};
HorizontalCardsList.storyName = 'HorizontalCardsList';

export default createMeta({
  component: Card,
  title: 'Components/Cards/Card',
  argTypes: {
    wrapper: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'Card wrapper can be Link or Button' },
      },
    },
    image: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'Card image component' },
      },
    },
    direction: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'Card direction - vertical or horizontal' },
      },
    },
  },
});
