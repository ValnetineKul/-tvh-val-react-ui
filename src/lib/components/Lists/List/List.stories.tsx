import type { ComponentProps } from 'react';
import React from 'react';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import { Check } from '../../Icon/icons/functional';
import List from './List';
import ListItem from './ListItem';

type Props = ComponentProps<typeof List>;
type Args = Omit<Props, 'children'>;

const Template = ((args: Args) => {
  return (
    <List {...args}>
      <ListItem>Unordered list item</ListItem>
      <ListItem>Unordered list item</ListItem>
      <ListItem>Unordered list item</ListItem>
      <ListItem>
        Unordered list item
        <List>
          <ListItem>Unordered list item</ListItem>
          <ListItem>Unordered list item</ListItem>
          <ListItem>Unordered list item</ListItem>
        </List>
      </ListItem>
    </List>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  ordered: false,
};

Primitive.storyName = 'List';

const IconTemplate = ((args: Args) => {
  return (
    <List {...args}>
      <ListItem icon={Check}>Icon list item</ListItem>
      <ListItem icon={Check}>Icon list item</ListItem>
      <ListItem icon={Check}>Icon list item</ListItem>
      <ListItem icon={Check}>
        Icon list item
        <List>
          <ListItem icon={Check}>Icon list item</ListItem>
          <ListItem icon={Check}>Icon list item</ListItem>
          <ListItem icon={Check}>Icon list item</ListItem>
        </List>
      </ListItem>
    </List>
  );
}) as StoryTemplate<Args>;

export const IconPrimitive = IconTemplate.bind({});
IconPrimitive.args = {
  ...Primitive.args,
};

IconPrimitive.storyName = 'IconList';

export default createMeta({
  component: List,
  title: 'Components/Lists/List',
  argTypes: {
    ordered: {
      control: {
        // Remove this when ordered styles will be added
        disable: true,
      },
    },
  },
});
